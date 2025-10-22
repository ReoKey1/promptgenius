const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const supabase = require('../config/supabase');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Create checkout session for lifetime deal
router.post('/create-checkout', authMiddleware, async (req, res) => {
  try {
    const { tier, priceId } = req.body;

    if (!['tier1', 'tier2', 'tier3'].includes(tier)) {
      return res.status(400).json({ error: 'Invalid tier' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/pricing`,
      client_reference_id: req.user.id,
      metadata: {
        tier,
        userId: req.user.id
      }
    });

    res.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Create checkout error:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

// Create subscription for monthly plan
router.post('/create-subscription', authMiddleware, async (req, res) => {
  try {
    const { priceId } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/pricing`,
      client_reference_id: req.user.id,
      metadata: {
        tier: 'monthly',
        userId: req.user.id
      }
    });

    res.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Create subscription error:', error);
    res.status(500).json({ error: 'Failed to create subscription' });
  }
});

// Webhook handler for Stripe events
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      
      // Update user tier
      const { error } = await supabase
        .from('users')
        .update({ tier: session.metadata.tier })
        .eq('id', session.metadata.userId);

      if (error) {
        console.error('Failed to update user tier:', error);
      }
      break;

    case 'customer.subscription.deleted':
      // Handle subscription cancellation
      const subscription = event.data.object;
      
      // Downgrade user to tier1
      await supabase
        .from('users')
        .update({ tier: 'tier1' })
        .eq('stripe_customer_id', subscription.customer);
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

// Get customer portal URL (for subscription management)
router.post('/create-portal-session', authMiddleware, async (req, res) => {
  try {
    // Get user's Stripe customer ID
    const { data: user } = await supabase
      .from('users')
      .select('stripe_customer_id')
      .eq('id', req.user.id)
      .single();

    if (!user || !user.stripe_customer_id) {
      return res.status(400).json({ error: 'No subscription found' });
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: user.stripe_customer_id,
      return_url: `${process.env.FRONTEND_URL}/settings`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Create portal session error:', error);
    res.status(500).json({ error: 'Failed to create portal session' });
  }
});

module.exports = router;

