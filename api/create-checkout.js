// Stripe Checkout API for Prompt-U Store
// This serverless function creates Stripe checkout sessions for merchandise purchases

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { productId, quantity = 1 } = req.body;

    // Product catalog
    const products = {
      'tshirt-2023': {
        name: 'Stop Prompting Like It\'s 2023 T-Shirt',
        price: 2900, // $29.00 in cents
        description: 'Retro-style design with bold gradient typography',
        images: ['https://prompt-u.com/assets/store/tshirt-2023.png']
      },
      'tshirt-therapy': {
        name: 'Your Prompts Deserve Therapy T-Shirt',
        price: 2900,
        description: 'Minimalist design with humorous twist',
        images: ['https://prompt-u.com/assets/store/tshirt-therapy.png']
      },
      'tshirt-smarter': {
        name: 'Prompt Smarter, Not Harder T-Shirt',
        price: 2900,
        description: 'Professional design with tech-inspired patterns',
        images: ['https://prompt-u.com/assets/store/tshirt-smarter.png']
      },
      'bundle-2': {
        name: 'Fan Pack - 2 T-Shirts',
        price: 4900, // $49.00 (save $9)
        description: 'Choose any 2 t-shirt designs',
        images: ['https://prompt-u.com/assets/store/tshirt-2023.png']
      },
      'bundle-3': {
        name: 'Ultimate Pack - 3 T-Shirts',
        price: 6900, // $69.00 (save $18)
        description: 'All 3 t-shirt designs',
        images: ['https://prompt-u.com/assets/store/tshirt-2023.png']
      }
    };

    const product = products[productId];
    
    if (!product) {
      res.status(400).json({ error: 'Invalid product ID' });
      return;
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              description: product.description,
              images: product.images,
            },
            unit_amount: product.price,
          },
          quantity: quantity,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin || 'https://prompt-u.com'}/store.html?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin || 'https://prompt-u.com'}/store.html?canceled=true`,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'AT', 'CH', 'SE', 'NO', 'DK', 'FI', 'IE', 'PT', 'PL', 'CZ', 'HU', 'RO', 'GR', 'BG', 'HR', 'SI', 'SK', 'LT', 'LV', 'EE', 'CY', 'MT', 'LU'],
      },
      metadata: {
        product_id: productId,
        quantity: quantity.toString(),
      },
    });

    res.status(200).json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    res.status(500).json({ error: error.message });
  }
};

