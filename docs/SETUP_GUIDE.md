# PromptGenius Setup Guide

Complete step-by-step guide to set up and deploy PromptGenius.

## Table of Contents

1. [Prerequisites](#prerequisites)

1. [Project Structure](#project-structure)

1. [Database Setup (Supabase)](#database-setup)

1. [Backend Setup](#backend-setup)

1. [Frontend Setup](#frontend-setup)

1. [Marketing Website Setup](#marketing-website-setup)

1. [Payment Integration (Stripe)](#payment-integration)

1. [Testing Locally](#testing-locally)

1. [Deployment](#deployment)

1. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have:

### Required Accounts (All Free Tiers Available)

- [ ] **Supabase** account (database) - [https://supabase.com](https://supabase.com)

- [ ] **Stripe** account (payments) - [https://stripe.com](https://stripe.com)

- [ ] **Vercel** account (deployment) - [https://vercel.com](https://vercel.com)

- [ ] **GitHub** account (code hosting) - [https://github.com](https://github.com)

### Required Software

- [ ] **Node.js** 18+ - [https://nodejs.org](https://nodejs.org)

- [ ] **npm** or **pnpm** (comes with Node.js)

- [ ] **Git** - [https://git-scm.com](https://git-scm.com)

- [ ] Code editor (**VS Code** recommended)

### Verify Installation

```bash
node --version  # Should be 18.0.0 or higher
npm --version   # Should be 9.0.0 or higher
git --version   # Any recent version
```

---

## Project Structure

```
promptgenius/
├── backend/              # Node.js API server
│   ├── config/          # Configuration files
│   ├── middleware/      # Express middleware
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   ├── server.js        # Entry point
│   ├── package.json
│   └── .env.example
│
├── frontend/            # React application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── lib/        # Utilities and API client
│   │   ├── hooks/      # Custom hooks
│   │   └── App.jsx     # Main app component
│   ├── package.json
│   └── .env.example
│
├── marketing-website/   # Marketing landing page
│   ├── src/
│   ├── package.json
│   └── .env.example
│
├── database/           # Database schemas and seeds
│   ├── schema.sql
│   └── seed_templates.sql
│
├── deployment/         # Deployment configurations
│   ├── vercel.json
│   └── railway.json
│
├── docs/              # Documentation
│   ├── SETUP_GUIDE.md (this file)
│   ├── DEPLOYMENT_GUIDE.md
│   ├── API_DOCUMENTATION.md
│   └── FEATURES.md
│
└── launch-materials/  # AppSumo listing materials
    ├── listing-copy.md
    ├── demo-script.md
    └── email-templates.md
```

---

## Database Setup

### Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)

1. Click "New Project"

1. Fill in:
  - **Name**: promptgenius
  - **Database Password**: (save this securely!)
  - **Region**: Choose closest to your users

1. Click "Create new project"

1. Wait 2-3 minutes for setup

### Step 2: Get Database Credentials

1. In your Supabase project, go to **Settings** > **API**

1. Copy these values (you'll need them later):
  - **Project URL**: `https://xxxxx.supabase.co`
  - **anon public key**: `eyJhbGc...` (for frontend)
  - **service_role key**: `eyJhbGc...` (for backend - keep secret!)

### Step 3: Run Database Schema

1. In Supabase, go to **SQL Editor**

1. Click "New Query"

1. Copy the entire contents of `database/schema.sql`

1. Paste into the SQL editor

1. Click "Run" or press Ctrl+Enter

1. You should see "Success. No rows returned"

### Step 4: Seed Template Data

1. Create another new query

1. Copy the entire contents of `database/seed_templates.sql`

1. Paste and run

1. You should see "Success" with 15+ rows inserted

### Step 5: Verify Database

1. Go to **Table Editor** in Supabase

1. You should see these tables:
  - users
  - prompts
  - templates
  - brand_voices
  - teams
  - team_members

1. Click on "templates" - you should see 15+ template rows

✅ **Database setup complete!**

---

## Backend Setup

### Step 1: Install Dependencies

```bash
cd backend
npm install
```

This installs:

- express (web server)

- @supabase/supabase-js (database client)

- bcryptjs (password hashing)

- jsonwebtoken (authentication)

- stripe (payment processing)

- cors, dotenv (utilities)

### Step 2: Configure Environment Variables

1. Copy the example file:

1. Open `.env` in your editor

1. Fill in the values:

```
# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# JWT Secret (generate a random string)
# You can use: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET=your-generated-secret-here

# Supabase Configuration (from Step 2 above)
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGc...your-service-role-key...

# Stripe Configuration (we'll add these next)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PUBLISHABLE_KEY=pk_test_...

# Stripe Price IDs (we'll create these next)
STRIPE_PRICE_TIER1=price_...
STRIPE_PRICE_TIER2=price_...
STRIPE_PRICE_TIER3=price_...
STRIPE_PRICE_MONTHLY=price_...
```

### Step 3: Test Backend

```bash
npm run dev
```

You should see:

```
Server running on port 5000
```

Test the health endpoint:

```bash
curl http://localhost:5000/health
```

Should return:

```json
{"status":"ok","message":"PromptGenius API is running"}
```

✅ **Backend setup complete!**

---

## Frontend Setup

### Step 1: Install Dependencies

```bash
cd ../frontend
npm install
```

### Step 2: Configure Environment Variables

1. Copy the example file:

1. Fill in:

```
# API URL (backend)
VITE_API_URL=http://localhost:5000

# Supabase (for direct database access if needed)
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...your-anon-key...

# Stripe Publishable Key
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### Step 3: Test Frontend

```bash
npm run dev
```

You should see:

```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

✅ **Frontend setup complete!**

---

## Marketing Website Setup

### Step 1: Install Dependencies

```bash
cd ../marketing-website
npm install
```

### Step 2: Configure Environment

```bash
cp .env.example .env
```

```
# App URL (for CTA buttons)
VITE_APP_URL=http://localhost:5173

# API URL (for waitlist, contact forms)
VITE_API_URL=http://localhost:5000
```

### Step 3: Test Marketing Site

```bash
npm run dev -- --port 3000
```

Open [http://localhost:3000](http://localhost:3000)

✅ **Marketing website setup complete!**

---

## Payment Integration

### Step 1: Create Stripe Account

1. Go to [https://stripe.com](https://stripe.com)

1. Sign up for a free account

1. Complete business details (can use test mode)

### Step 2: Get API Keys

1. In Stripe Dashboard, go to **Developers** > **API keys**

1. Copy:
  - **Publishable key**: `pk_test_...`
  - **Secret key**: `sk_test_...`

1. Add these to your `.env` files (backend and frontend)

### Step 3: Create Products and Prices

1. In Stripe Dashboard, go to **Products**

1. Click "Add product"

**Create 4 products:**

#### Product 1: Tier 1 - Starter (Lifetime)

- Name: PromptGenius Tier 1 - Starter

- Description: Lifetime access to PromptGenius Starter plan

- Pricing: One-time payment

- Price: $59 USD

- Copy the Price ID (starts with `price_...`)

- Add to `.env` as `STRIPE_PRICE_TIER1`

#### Product 2: Tier 2 - Professional (Lifetime)

- Name: PromptGenius Tier 2 - Professional

- Description: Lifetime access to PromptGenius Professional plan

- Pricing: One-time payment

- Price: $79 USD

- Copy Price ID → `STRIPE_PRICE_TIER2`

#### Product 3: Tier 3 - Enterprise (Lifetime)

- Name: PromptGenius Tier 3 - Enterprise

- Description: Lifetime access to PromptGenius Enterprise plan

- Pricing: One-time payment

- Price: $99 USD

- Copy Price ID → `STRIPE_PRICE_TIER3`

#### Product 4: Monthly Subscription

- Name: PromptGenius Monthly

- Description: Monthly subscription to PromptGenius

- Pricing: Recurring (monthly)

- Price: $49 USD/month

- Copy Price ID → `STRIPE_PRICE_MONTHLY`

### Step 4: Set Up Webhook

1. In Stripe Dashboard, go to **Developers** > **Webhooks**

1. Click "Add endpoint"

1. Endpoint URL: `https://your-backend-url.com/api/payments/webhook`
  - For local testing: Use Stripe CLI or ngrok

1. Select events to listen to:
  - `checkout.session.completed`
  - `customer.subscription.deleted`

1. Click "Add endpoint"

1. Copy the **Signing secret** (starts with `whsec_...`)

1. Add to `.env` as `STRIPE_WEBHOOK_SECRET`

### Step 5: Test Payment Flow

1. Start backend and frontend

1. Go to [http://localhost:5173/pricing](http://localhost:5173/pricing)

1. Click "Get Started" on any tier

1. Use Stripe test card:
  - Card: `4242 4242 4242 4242`
  - Expiry: Any future date
  - CVC: Any 3 digits
  - ZIP: Any 5 digits

1. Complete checkout

1. You should be redirected to success page

1. Check Supabase - user's tier should be updated

✅ **Payment integration complete!**

---

## Testing Locally

### Full System Test

1. **Start all services:**

1. **Test user flow:**
  - Visit [http://localhost:3000](http://localhost:3000) (marketing site)
  - Click "Get Started" → redirects to app
  - Register new account
  - Create a prompt
  - Check quality score
  - Try a template
  - Create brand voice
  - Test payment flow

1. **Verify database:**
  - Go to Supabase Table Editor
  - Check `users` table - new user should exist
  - Check `prompts` table - prompt should exist
  - Check user's `tier` field after payment

✅ **Local testing complete!**

---

## Deployment

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed deployment instructions.

### Quick Deployment Summary

1. **Push to GitHub:**

1. **Deploy Backend (Railway):**
  - Connect GitHub repo
  - Add environment variables
  - Deploy

1. **Deploy Frontend (Vercel):**
  - Connect GitHub repo
  - Set build command: `cd frontend && npm run build`
  - Add environment variables
  - Deploy

1. **Deploy Marketing Site (Vercel):**
  - Same process as frontend
  - Different project

1. **Update Stripe Webhook:**
  - Change webhook URL to production backend URL

✅ **Deployment complete!**

---

## Troubleshooting

### Backend won't start

**Error: ****`Cannot find module`**

```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

**Error: ****`EADDRINUSE: address already in use`**

- Port 5000 is taken

- Change `PORT` in `.env` to 5001

- Or kill process: `lsof -ti:5000 | xargs kill`

**Error: ****`Invalid Supabase credentials`**

- Double-check `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` in `.env`

- Make sure you're using the **service_role** key, not anon key

### Frontend won't start

**Error: ****`Failed to fetch`**

- Backend not running

- Check `VITE_API_URL` in frontend `.env`

- Make sure backend is at that URL

**Error: ****`Module not found`**

```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Database errors

**Error: ****`relation "users" does not exist`**

- Schema not created

- Go to Supabase SQL Editor

- Run `database/schema.sql` again

**Error: ****`RLS policy violation`**

- Row Level Security blocking access

- Check if you're using the correct API key

- Backend should use `service_role` key

### Payment errors

**Error: ****`Invalid API key`**

- Check `STRIPE_SECRET_KEY` in backend `.env`

- Make sure it starts with `sk_test_` or `sk_live_`

**Error: ****`No such price`**

- Price ID doesn't exist

- Go to Stripe Dashboard > Products

- Copy correct Price ID

**Webhook not receiving events**

- Check webhook URL is correct

- Check webhook signing secret

- Use Stripe CLI for local testing:

### General debugging

**Enable debug logging:**

Backend (`server.js`):

```javascript
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});
```

Frontend (browser console):

```javascript
localStorage.setItem('debug', 'true');
```

**Check logs:**

- Backend: Terminal where `npm run dev` is running

- Frontend: Browser Developer Tools > Console

- Supabase: Supabase Dashboard > Logs

- Stripe: Stripe Dashboard > Developers > Logs

---

## Next Steps

Once everything is working locally:

1. ✅ Complete local testing

1. 📖 Read [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

1. 🚀 Deploy to production

1. 📝 Read [FEATURES.md](./FEATURES.md) to understand all features

1. 🎯 Prepare AppSumo launch materials

1. 🎉 Launch!

---

## Support

If you encounter issues not covered here:

1. Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

1. Review [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

1. Check the code comments

1. Search for error messages online

---

## Estimated Setup Time

- **Prerequisites**: 30 minutes (if installing Node.js, etc.)

- **Database Setup**: 15 minutes

- **Backend Setup**: 15 minutes

- **Frontend Setup**: 10 minutes

- **Marketing Site Setup**: 10 minutes

- **Stripe Setup**: 20 minutes

- **Testing**: 30 minutes

**Total**: ~2-3 hours for first-time setup

Once you've done it once, subsequent setups take ~30 minutes.

---

**Ready to deploy?** Continue to [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)