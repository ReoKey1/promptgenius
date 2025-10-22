# Stripe Setup Instructions

Follow these steps to set up Stripe for payment processing in PromptGenius.

## Step 1: Create Stripe Account

1. **Go to**: https://stripe.com
2. **Click "Start now"** or "Sign up"
3. **Create account** with your email
4. **Verify email** (check inbox)
5. **Complete business details**:
   - Business name: PromptGenius (or your company name)
   - Business type: Individual or Company
   - Country: Your country
   - You can use test mode for now

## Step 2: Get API Keys

1. In Stripe Dashboard, ensure you're in **Test mode** (toggle in top right)
2. Go to **Developers** > **API keys** (left sidebar)
3. Copy these two keys:
   - **Publishable key**: `pk_test_...`
   - **Secret key**: `sk_test_...` (click "Reveal test key")

## Step 3: Create Products and Prices

We need to create 4 products for the lifetime deal tiers.

### Product 1: Tier 1 - Starter (Lifetime)

1. Go to **Products** in left sidebar
2. Click **"+ Add product"**
3. Fill in:
   - **Name**: `PromptGenius Tier 1 - Starter`
   - **Description**: `Lifetime access to PromptGenius Starter plan - 100 prompts, 5 templates, 1 brand voice`
   - **Pricing model**: One-time
   - **Price**: `59.00` USD
4. Click **"Save product"**
5. **Copy the Price ID** (starts with `price_...`) - you'll need this!

### Product 2: Tier 2 - Professional (Lifetime)

1. Click **"+ Add product"** again
2. Fill in:
   - **Name**: `PromptGenius Tier 2 - Professional`
   - **Description**: `Lifetime access to PromptGenius Professional plan - 500 prompts, 20 templates, 3 brand voices, 3 team members`
   - **Pricing model**: One-time
   - **Price**: `79.00` USD
3. Click **"Save product"**
4. **Copy the Price ID**

### Product 3: Tier 3 - Enterprise (Lifetime)

1. Click **"+ Add product"** again
2. Fill in:
   - **Name**: `PromptGenius Tier 3 - Enterprise`
   - **Description**: `Lifetime access to PromptGenius Enterprise plan - Unlimited prompts, templates, brand voices, 10 team members, analytics`
   - **Pricing model**: One-time
   - **Price**: `99.00` USD
3. Click **"Save product"**
4. **Copy the Price ID**

### Product 4: Monthly Subscription

1. Click **"+ Add product"** again
2. Fill in:
   - **Name**: `PromptGenius Monthly`
   - **Description**: `Monthly subscription to PromptGenius - Full access`
   - **Pricing model**: Recurring
   - **Billing period**: Monthly
   - **Price**: `49.00` USD/month
3. Click **"Save product"**
4. **Copy the Price ID**

## Step 4: Set Up Webhook

1. Go to **Developers** > **Webhooks**
2. Click **"Add endpoint"**
3. **Endpoint URL**: We'll add this after deploying the backend
   - For now, use: `https://example.com/api/payments/webhook`
   - We'll update this later
4. **Events to listen to**:
   - Click "Select events"
   - Search and select:
     - `checkout.session.completed`
     - `customer.subscription.deleted`
5. Click **"Add endpoint"**
6. **Copy the Signing secret** (starts with `whsec_...`)

## Step 5: Provide Your Credentials

Once you have all the values, provide them in this format:

```
Publishable Key: pk_test_...
Secret Key: sk_test_...
Webhook Secret: whsec_...
Price ID Tier 1: price_...
Price ID Tier 2: price_...
Price ID Tier 3: price_...
Price ID Monthly: price_...
```

---

**Ready?** Let me know when you have all these values!

