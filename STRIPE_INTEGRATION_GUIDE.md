# Stripe Integration Guide for Prompt-U Store

Complete guide for integrating your existing Stripe account with the Prompt-U merchandise store.

---

## ✅ What's Been Integrated

### **Stripe Checkout System:**
- ✅ Stripe.js loaded on store page
- ✅ Checkout API endpoint (`/api/create-checkout.js`)
- ✅ Webhook handler (`/api/stripe-webhook.js`)
- ✅ Three products configured ($29 each)
- ✅ Success/cancel redirect handling
- ✅ Shipping address collection
- ✅ Secure payment processing

---

## 🔑 Setup Steps (15 Minutes)

### **Step 1: Get Your Stripe Keys** (5 min)

1. **Log into Stripe Dashboard**
   ```
   Go to: https://dashboard.stripe.com/apikeys
   ```

2. **Copy Your Keys**
   ```
   Publishable key: pk_live_xxxxx (or pk_test_xxxxx for testing)
   Secret key: sk_live_xxxxx (or sk_test_xxxxx for testing)
   ```

3. **Add to Environment Variables**
   ```bash
   # Create .env file in project root
   cp .env.example .env
   
   # Edit .env and add your keys:
   VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_key_here
   STRIPE_SECRET_KEY=sk_live_your_key_here
   ```

---

### **Step 2: Set Up Webhook** (5 min)

1. **Create Webhook Endpoint**
   ```
   1. Go to: https://dashboard.stripe.com/webhooks
   2. Click "+ Add endpoint"
   3. Enter URL: https://prompt-u.com/api/stripe-webhook
   4. Select events to listen for:
      - checkout.session.completed
      - payment_intent.succeeded
      - payment_intent.payment_failed
   5. Click "Add endpoint"
   ```

2. **Copy Webhook Secret**
   ```
   After creating, click on the webhook
   Click "Reveal" next to "Signing secret"
   Copy: whsec_xxxxx
   ```

3. **Add to Environment Variables**
   ```bash
   # Add to .env file:
   STRIPE_WEBHOOK_SECRET=whsec_your_secret_here
   ```

---

### **Step 3: Deploy API Endpoints** (5 min)

**If using Vercel:**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd /home/ubuntu/prompt-u
vercel --prod

# Add environment variables in Vercel dashboard:
# Settings → Environment Variables
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

**If using Netlify:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
cd /home/ubuntu/prompt-u
netlify deploy --prod

# Add environment variables in Netlify dashboard:
# Site settings → Build & deploy → Environment
```

---

## 🛒 How It Works

### **Customer Flow:**

1. **Customer clicks "Buy Now - $29"**
   - Button triggers `checkout(productId)` function
   - Shows "Processing..." loading state

2. **Create Checkout Session**
   - Frontend calls `/api/create-checkout`
   - Backend creates Stripe checkout session
   - Returns session ID

3. **Redirect to Stripe**
   - Customer redirected to Stripe Checkout
   - Secure payment form hosted by Stripe
   - Collects card info + shipping address

4. **Payment Processing**
   - Stripe processes payment
   - Customer completes purchase

5. **Redirect Back**
   - Success: `store.html?success=true`
   - Cancel: `store.html?canceled=true`
   - Shows success/cancel message

6. **Webhook Notification**
   - Stripe sends webhook to `/api/stripe-webhook`
   - Backend receives order details
   - Ready for fulfillment

---

## 💳 Product Catalog

### **Currently Configured:**

| Product ID | Name | Price | Description |
|------------|------|-------|-------------|
| `tshirt-2023` | Stop Prompting Like It's 2023 | $29 | Retro gradient design |
| `tshirt-therapy` | Your Prompts Deserve Therapy | $29 | Minimalist with couch |
| `tshirt-smarter` | Prompt Smarter, Not Harder | $29 | Tech circuit pattern |
| `bundle-2` | Fan Pack - 2 T-Shirts | $49 | Save $9 |
| `bundle-3` | Ultimate Pack - 3 T-Shirts | $69 | Save $18 |

### **To Add More Products:**

Edit `/api/create-checkout.js`:

```javascript
const products = {
  'hoodie-2023': {
    name: 'Stop Prompting Like It\'s 2023 Hoodie',
    price: 4900, // $49.00 in cents
    description: 'Warm hoodie with retro design',
    images: ['https://prompt-u.com/assets/store/hoodie-2023.png']
  },
  // Add more products...
};
```

Then add button to `store.html`:

```html
<button class="btn btn-primary btn-block" 
        onclick="checkout(this.dataset.product)" 
        data-product="hoodie-2023">
  Buy Now - $49
</button>
```

---

## 🔒 Security Features

### **Built-in Protection:**

✅ **PCI Compliance**
- No card data touches your server
- Stripe handles all sensitive information
- PCI DSS Level 1 certified

✅ **Webhook Verification**
- Signature verification prevents fake webhooks
- Only authentic Stripe events processed

✅ **Environment Variables**
- API keys stored securely
- Never committed to git
- Different keys for test/production

✅ **HTTPS Required**
- Stripe requires SSL certificate
- All data encrypted in transit

---

## 🧪 Testing

### **Test Mode:**

1. **Use Test Keys**
   ```
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
   STRIPE_SECRET_KEY=sk_test_xxxxx
   ```

2. **Test Cards**
   ```
   Success: 4242 4242 4242 4242
   Decline: 4000 0000 0000 0002
   3D Secure: 4000 0025 0000 3155
   
   Expiry: Any future date
   CVC: Any 3 digits
   ZIP: Any 5 digits
   ```

3. **Test Checkout**
   - Click "Buy Now"
   - Use test card
   - Complete purchase
   - Check Stripe dashboard for payment

4. **Test Webhook**
   ```bash
   # Install Stripe CLI
   stripe listen --forward-to localhost:3000/api/stripe-webhook
   
   # Trigger test event
   stripe trigger checkout.session.completed
   ```

---

## 📊 Stripe Dashboard

### **Monitor Sales:**

**Payments Tab:**
- View all transactions
- Filter by status, date, amount
- Export to CSV

**Customers Tab:**
- View customer list
- See purchase history
- Manage subscriptions (if added)

**Reports Tab:**
- Revenue reports
- Tax reports
- Payout schedule

---

## 🔗 Order Fulfillment Integration

### **Option 1: Manual Fulfillment**

When webhook receives `checkout.session.completed`:

1. Check email for order notification
2. Log into Printify
3. Create order manually with shipping details
4. Printify ships to customer

### **Option 2: Automatic Fulfillment (Recommended)**

Add Printify API integration to webhook handler:

```javascript
// In /api/stripe-webhook.js

case 'checkout.session.completed':
  const session = event.data.object;
  
  if (session.payment_status === 'paid') {
    // Create Printify order automatically
    await fetch('https://api.printify.com/v1/shops/{shop_id}/orders.json', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PRINTIFY_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        external_id: session.id,
        line_items: [{
          product_id: 'printify_product_id',
          variant_id: 'printify_variant_id',
          quantity: session.metadata.quantity
        }],
        shipping_method: 1,
        address_to: {
          first_name: session.shipping_details.name.split(' ')[0],
          last_name: session.shipping_details.name.split(' ')[1],
          email: session.customer_email,
          address1: session.shipping_details.address.line1,
          city: session.shipping_details.address.city,
          zip: session.shipping_details.address.postal_code,
          country: session.shipping_details.address.country
        }
      })
    });
    
    // Send confirmation email
    await sendEmail({
      to: session.customer_email,
      subject: 'Order Confirmed - Prompt-U Store',
      body: `Thank you for your order! Your ${session.metadata.product_id} is being printed...`
    });
  }
  break;
```

---

## 💰 Pricing & Fees

### **Stripe Fees:**
- **US cards:** 2.9% + $0.30 per transaction
- **International cards:** 3.9% + $0.30 per transaction
- **No monthly fees** (pay-as-you-go)

### **Example Calculation:**

**$29 T-Shirt Sale:**
```
Sale price: $29.00
Stripe fee: $1.14 (2.9% + $0.30)
Net revenue: $27.86
Printify cost: $12.00
Your profit: $15.86 (54.7%)
```

**$49 Bundle Sale:**
```
Sale price: $49.00
Stripe fee: $1.72
Net revenue: $47.28
Printify cost: $24.00 (2 shirts)
Your profit: $23.28 (47.5%)
```

---

## 🎯 Launch Checklist

### **Before Going Live:**

- [ ] Stripe account verified
- [ ] Publishable key added to `.env`
- [ ] Secret key added to `.env`
- [ ] Webhook endpoint created
- [ ] Webhook secret added to `.env`
- [ ] API endpoints deployed to Vercel/Netlify
- [ ] Environment variables set in hosting dashboard
- [ ] Test purchase completed successfully
- [ ] Webhook received and logged
- [ ] Success/cancel redirects working
- [ ] Switch from test to live keys
- [ ] Test live purchase with real card
- [ ] Verify payment appears in dashboard

### **After Launch:**

- [ ] Monitor Stripe dashboard daily
- [ ] Set up email notifications
- [ ] Configure payout schedule
- [ ] Add tax collection (if required)
- [ ] Set up receipt emails
- [ ] Create refund policy
- [ ] Test customer support flow

---

## 🆘 Troubleshooting

### **Common Issues:**

**1. "Stripe is not defined"**
```
Solution: Ensure Stripe.js is loaded before checkout script
Check: <script src="https://js.stripe.com/v3/"></script> in <head>
```

**2. "Invalid API key"**
```
Solution: Check .env file has correct keys
Verify: Keys start with pk_live_ or sk_live_ (or pk_test_/sk_test_)
```

**3. "Webhook signature verification failed"**
```
Solution: Check STRIPE_WEBHOOK_SECRET is correct
Get from: Stripe Dashboard → Webhooks → Click endpoint → Reveal secret
```

**4. "Payment succeeded but no webhook received"**
```
Solution: Check webhook endpoint URL is correct
Verify: https://prompt-u.com/api/stripe-webhook (not localhost)
Test: Send test event from Stripe dashboard
```

**5. "Checkout button does nothing"**
```
Solution: Check browser console for errors
Verify: /api/create-checkout endpoint is deployed
Test: Call API directly with curl
```

---

## 📞 Support Resources

- **Stripe Docs:** https://stripe.com/docs
- **Stripe Dashboard:** https://dashboard.stripe.com
- **Stripe Support:** https://support.stripe.com
- **Test Cards:** https://stripe.com/docs/testing
- **Webhook Testing:** https://stripe.com/docs/webhooks/test

---

## 🎉 You're Ready!

Your Stripe integration is complete and ready to process payments!

**Next steps:**
1. Add your Stripe keys to `.env`
2. Deploy to Vercel/Netlify
3. Set up webhook endpoint
4. Test with test card
5. Switch to live keys
6. Start selling! 🚀

**Expected setup time:** 15 minutes
**Expected first sale:** Within 24-48 hours of launch

