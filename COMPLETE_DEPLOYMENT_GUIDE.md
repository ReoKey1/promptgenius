# 🚀 Prompt-U Complete Deployment Guide

## Overview

This guide will walk you through deploying the complete Prompt-U application to production with GitHub, Vercel, and Supabase.

**Total Time:** 60 minutes  
**Difficulty:** Intermediate  
**Prerequisites:** GitHub account, Vercel account, Supabase account, Stripe account

---

## 📋 What's Been Built

### ✅ Complete Features

**Landing Page:**
- Hero section with "How It Works"
- Pain points and solutions
- Feature comparison table
- Pricing tiers
- Blog and store navigation
- Login/Signup modals

**Dashboard:**
- Prompt editor with real-time quality scoring (1-100)
- Template library (6 default + custom templates)
- Brand voice profiles
- Prompt history with versioning
- Optimization suggestions
- Mobile responsive

**Store:**
- 3 t-shirt products with images
- Stripe payment integration
- Automatic order fulfillment

**Blog:**
- 4 SEO-optimized articles (18,500+ words)
- Blog index page
- Internal linking

**Security:**
- Row Level Security on all database tables
- Input validation and sanitization
- Rate limiting on auth attempts
- Password strength requirements
- XSS and CSRF protection
- Secure token storage

---

## 🎯 Deployment Steps

### **Step 1: Set Up Supabase** (20 minutes)

#### 1.1 Create Supabase Project

1. Go to https://supabase.com
2. Click "Start your project"
3. Sign in or create account
4. Click "New project"
5. Fill in:
   - **Name:** prompt-u
   - **Database Password:** (generate strong password - save it!)
   - **Region:** Choose closest to your users
6. Click "Create new project"
7. Wait 2-3 minutes for setup

#### 1.2 Run Database Schema

1. In Supabase dashboard, click "SQL Editor" (left sidebar)
2. Click "+ New query"
3. Open `/deployment/supabase-schema.sql` from your project
4. Copy the entire SQL script
5. Paste into the SQL editor
6. Click "Run" (bottom right)
7. Wait for success message: "✅ Prompt-U database schema created successfully!"

#### 1.3 Get API Keys

1. Click "Settings" (gear icon, left sidebar)
2. Click "API" in settings menu
3. Copy these values (you'll need them later):
   - **Project URL:** `https://xxxxx.supabase.co`
   - **anon public key:** `eyJ...` (long string)

#### 1.4 Configure Email Auth

1. In Supabase dashboard, click "Authentication" → "Providers"
2. Find "Email" provider
3. Enable "Confirm email" (recommended)
4. Set "Site URL" to `https://prompt-u.com` (or your domain)
5. Add redirect URLs:
   - `https://prompt-u.com/dashboard`
   - `https://your-vercel-url.vercel.app/dashboard` (temporary)
6. Click "Save"

---

### **Step 2: Set Up Stripe** (15 minutes)

#### 2.1 Create Stripe Products

1. Go to https://dashboard.stripe.com
2. Click "Products" → "+ Add product"
3. Create 3 products:

**Product 1: "Stop Prompting Like It's 2023" T-Shirt**
- Name: Stop Prompting Like It's 2023 T-Shirt
- Description: Retro gradient design
- Price: $29.00 USD
- Click "Save product"
- Copy the **Price ID** (starts with `price_...`)

**Product 2: "Your Prompts Deserve Therapy" T-Shirt**
- Name: Your Prompts Deserve Therapy T-Shirt
- Description: Minimalist design with couch icon
- Price: $29.00 USD
- Click "Save product"
- Copy the **Price ID**

**Product 3: "Prompt Smarter, Not Harder" T-Shirt**
- Name: Prompt Smarter, Not Harder T-Shirt
- Description: Tech circuit pattern design
- Price: $29.00 USD
- Click "Save product"
- Copy the **Price ID**

#### 2.2 Get Stripe API Keys

1. Click "Developers" → "API keys"
2. Copy these values:
   - **Publishable key:** `pk_test_...` or `pk_live_...`
   - **Secret key:** `sk_test_...` or `sk_live_...` (click "Reveal")

⚠️ **Important:** Use test keys for development, live keys for production

#### 2.3 Set Up Webhook (Do this after Vercel deployment)

*We'll come back to this in Step 4*

---

### **Step 3: Deploy to Vercel** (15 minutes)

#### 3.1 Connect GitHub Repository

1. Go to https://vercel.com
2. Sign in or create account
3. Click "Add New..." → "Project"
4. Click "Import Git Repository"
5. Find "prompt-u" repository
6. Click "Import"

#### 3.2 Configure Project Settings

1. **Framework Preset:** Select "Other" or "Vite"
2. **Root Directory:** Leave as `.` (root)
3. **Build Command:** Leave default or use `npm run build` (if using Vite)
4. **Output Directory:** Leave default or use `dist` (if using Vite)

#### 3.3 Add Environment Variables

Click "Environment Variables" and add these:

| Name | Value | Where to find |
|------|-------|---------------|
| `VITE_SUPABASE_URL` | `https://xxxxx.supabase.co` | Supabase → Settings → API |
| `VITE_SUPABASE_ANON_KEY` | `eyJ...` | Supabase → Settings → API |
| `STRIPE_PUBLISHABLE_KEY` | `pk_test_...` or `pk_live_...` | Stripe → Developers → API keys |
| `STRIPE_SECRET_KEY` | `sk_test_...` or `sk_live_...` | Stripe → Developers → API keys |
| `STRIPE_PRODUCT_2023_ID` | `price_...` | Product 1 Price ID |
| `STRIPE_PRODUCT_THERAPY_ID` | `price_...` | Product 2 Price ID |
| `STRIPE_PRODUCT_SMARTER_ID` | `price_...` | Product 3 Price ID |

#### 3.4 Deploy

1. Click "Deploy"
2. Wait 2-5 minutes for deployment
3. Once complete, click "Visit" to see your site
4. Copy the deployment URL (e.g., `https://prompt-u-xxxxx.vercel.app`)

---

### **Step 4: Configure Stripe Webhook** (5 minutes)

#### 4.1 Create Webhook Endpoint

1. Go to Stripe Dashboard → "Developers" → "Webhooks"
2. Click "+ Add endpoint"
3. **Endpoint URL:** `https://your-vercel-url.vercel.app/api/stripe-webhook`
4. **Events to send:** Select these events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Click "Add endpoint"

#### 4.2 Get Webhook Secret

1. Click on the webhook you just created
2. Click "Reveal" under "Signing secret"
3. Copy the webhook secret (starts with `whsec_...`)

#### 4.3 Add Webhook Secret to Vercel

1. Go back to Vercel project
2. Click "Settings" → "Environment Variables"
3. Add new variable:
   - **Name:** `STRIPE_WEBHOOK_SECRET`
   - **Value:** `whsec_...` (the webhook secret you just copied)
4. Click "Save"
5. Go to "Deployments" tab
6. Click "..." on latest deployment → "Redeploy"

---

### **Step 5: Configure Custom Domain** (5 minutes)

#### 5.1 Add Domain to Vercel

1. In Vercel project, click "Settings" → "Domains"
2. Enter your domain: `prompt-u.com`
3. Click "Add"
4. Vercel will show you DNS records to add

#### 5.2 Update DNS Records

1. Go to your domain registrar (e.g., GoDaddy, Namecheap, Cloudflare)
2. Find DNS settings
3. Add the records Vercel provided:
   - **Type:** A or CNAME
   - **Name:** @ (root) or www
   - **Value:** (from Vercel)
4. Save changes
5. Wait 5-60 minutes for DNS propagation

#### 5.3 Update Supabase Redirect URLs

1. Go to Supabase dashboard
2. Click "Authentication" → "URL Configuration"
3. Update "Site URL" to `https://prompt-u.com`
4. Update redirect URLs:
   - `https://prompt-u.com/dashboard`
   - `https://www.prompt-u.com/dashboard`
5. Click "Save"

---

## ✅ Deployment Checklist

### **Before Going Live:**

- [ ] Supabase project created
- [ ] Database schema executed successfully
- [ ] Supabase API keys copied
- [ ] Email authentication configured
- [ ] Stripe products created (3 t-shirts)
- [ ] Stripe API keys copied
- [ ] Vercel project deployed
- [ ] Environment variables added to Vercel
- [ ] Stripe webhook configured
- [ ] Webhook secret added to Vercel
- [ ] Custom domain added to Vercel
- [ ] DNS records updated
- [ ] Supabase redirect URLs updated

### **Testing:**

- [ ] Landing page loads correctly
- [ ] Login modal opens and works
- [ ] Signup creates new account
- [ ] Email verification works (if enabled)
- [ ] Dashboard loads after login
- [ ] Prompt editor works
- [ ] Quality score calculates correctly
- [ ] Templates load
- [ ] Brand voices can be created
- [ ] History saves prompts
- [ ] Store page loads
- [ ] Stripe checkout works (use test card: 4242 4242 4242 4242)
- [ ] Blog pages load
- [ ] All navigation links work
- [ ] Mobile responsive design works
- [ ] Favicon displays correctly

### **Security:**

- [ ] HTTPS enforced (automatic with Vercel)
- [ ] Environment variables not exposed in frontend
- [ ] Row Level Security enabled in Supabase
- [ ] Password strength requirements work
- [ ] Rate limiting works (try 6 failed logins)
- [ ] Input sanitization works
- [ ] Stripe webhook signature verified

---

## 🎉 Post-Deployment

### **1. Test Everything**

Use the testing checklist above to verify all features work.

### **2. Monitor Performance**

- **Vercel Analytics:** Check traffic and performance
- **Supabase Dashboard:** Monitor database usage
- **Stripe Dashboard:** Track payments and customers

### **3. Set Up Monitoring**

Consider adding:
- **Sentry** for error tracking
- **Google Analytics** for user behavior
- **Hotjar** for heatmaps and session recordings

### **4. Backup Strategy**

- Supabase automatic backups: Daily (7 days retention on free tier)
- Consider upgrading to Pro for 30-day retention
- Export important data regularly

### **5. Security Maintenance**

- Review security logs weekly
- Update dependencies monthly (`npm audit`)
- Rotate API keys every 90 days
- Monitor failed login attempts

---

## 🚨 Troubleshooting

### **Issue: "Failed to fetch" errors**

**Solution:**
- Check environment variables in Vercel
- Verify Supabase URL and anon key are correct
- Check browser console for CORS errors

### **Issue: Login doesn't work**

**Solution:**
- Verify email authentication is enabled in Supabase
- Check redirect URLs are correct
- Look for errors in browser console
- Try clearing cookies and cache

### **Issue: Stripe checkout fails**

**Solution:**
- Verify Stripe API keys are correct (test vs live)
- Check product Price IDs are correct
- Verify webhook secret is set
- Check Stripe Dashboard for error logs

### **Issue: Database queries fail**

**Solution:**
- Verify RLS policies are enabled
- Check user is authenticated
- Review Supabase logs for errors
- Ensure schema was executed correctly

### **Issue: Custom domain not working**

**Solution:**
- Wait for DNS propagation (up to 48 hours)
- Verify DNS records are correct
- Check domain is not already in use
- Try `dig prompt-u.com` to verify DNS

---

## 📊 Expected Performance

### **Load Times:**
- Landing page: < 2 seconds
- Dashboard: < 3 seconds
- API responses: < 500ms

### **Capacity (Free Tiers):**
- **Vercel:** 100GB bandwidth/month
- **Supabase:** 500MB database, 2GB bandwidth, 50,000 monthly active users
- **Stripe:** Unlimited transactions

### **Scaling:**
- **Vercel:** Automatic scaling
- **Supabase:** Upgrade to Pro ($25/month) for more capacity
- **Stripe:** No limits

---

## 💰 Cost Estimate

### **Free Tier (Development):**
- Vercel: $0
- Supabase: $0
- Stripe: $0 (pay per transaction)
- **Total: $0/month**

### **Production (Small Scale):**
- Vercel Pro: $20/month
- Supabase Pro: $25/month
- Stripe: 2.9% + $0.30 per transaction
- **Total: ~$45/month + transaction fees**

### **Production (Medium Scale):**
- Vercel Pro: $20/month
- Supabase Pro: $25/month (or Team $599/month for high traffic)
- Stripe: 2.9% + $0.30 per transaction
- **Total: ~$45-$624/month + transaction fees**

---

## 📚 Additional Resources

### **Documentation:**
- [Vercel Docs](https://vercel.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Stripe Docs](https://stripe.com/docs)

### **Support:**
- Vercel Support: support@vercel.com
- Supabase Support: support@supabase.com
- Stripe Support: https://support.stripe.com

### **Community:**
- [Vercel Discord](https://vercel.com/discord)
- [Supabase Discord](https://discord.supabase.com)
- [Stripe Discord](https://discord.gg/stripe)

---

## ✅ Deployment Complete!

Congratulations! Your Prompt-U application is now live and ready for users.

**Next steps:**
1. Share on social media (use the social media campaign guide)
2. Submit to AppSumo
3. Start collecting user feedback
4. Monitor analytics and iterate

**Questions?** Check the troubleshooting section or reach out to support.

---

**Last Updated:** 2024-01-XX  
**Version:** 1.0.0  
**Deployed to:** https://prompt-u.com

