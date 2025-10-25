// Stripe Webhook Handler for Prompt-U Store
// Handles successful payments and triggers order fulfillment

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      
      // Extract order details
      const { 
        customer_email, 
        customer_details,
        shipping_details,
        metadata,
        amount_total,
        payment_status 
      } = session;

      if (payment_status === 'paid') {
        console.log('Payment successful:', {
          email: customer_email,
          product: metadata.product_id,
          quantity: metadata.quantity,
          amount: amount_total / 100,
          shipping: shipping_details
        });

        // TODO: Integrate with Printify API to create order
        // Example:
        // await createPrintifyOrder({
        //   product_id: metadata.product_id,
        //   quantity: metadata.quantity,
        //   shipping_address: shipping_details.address,
        //   customer_email: customer_email
        // });

        // TODO: Send confirmation email
        // await sendOrderConfirmationEmail({
        //   to: customer_email,
        //   order_details: { ... }
        // });

        // For now, log the order
        console.log('Order ready for fulfillment via Printify');
      }
      break;

    case 'payment_intent.succeeded':
      console.log('PaymentIntent succeeded:', event.data.object.id);
      break;

    case 'payment_intent.payment_failed':
      console.log('PaymentIntent failed:', event.data.object.id);
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.status(200).json({ received: true });
};

