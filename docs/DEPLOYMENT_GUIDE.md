# PromptGenius Deployment Guide

Complete guide to deploying PromptGenius to production.

## Table of Contents

1. [Deployment Overview](#deployment-overview)
2. [Pre-Deployment Checklist](#pre-deployment-checklist)
3. [Deploy Database (Supabase)](#deploy-database)
4. [Deploy Backend (Railway)](#deploy-backend)
5. [Deploy Frontend (Vercel)](#deploy-frontend)
6. [Deploy Marketing Site (Vercel)](#deploy-marketing-site)
7. [Configure Custom Domain](#configure-custom-domain)
8. [Production Stripe Setup](#production-stripe-setup)
9. [Post-Deployment Testing](#post-deployment-testing)
10. [Monitoring and Maintenance](#monitoring-and-maintenance)

---

## Deployment Overview

### Recommended Stack

| Component | Service | Cost | Why |
|-----------|---------|------|-----|
| **Database** | Supabase | Free tier | PostgreSQL + Auth + Storage |
| **Backend API** | Railway | $5/month | Easy deployment, great DX |
| **Frontend App** | Vercel | Free tier | Optimized for React, auto-deploy |
| **Marketing Site** | Vercel | Free tier | Same as frontend |
| **Domain** | Namecheap/Cloudflare | $10-15/year | Professional domain |
| **Email** | SendGrid/Resend | Free tier | Transactional emails |

**Total Monthly Cost**: ~$5-10 (can start with $0 using free tiers)

### Alternative Options

- **Backend**: Render, Fly.io, DigitalOcean App Platform
- **Frontend**: Netlify, Cloudflare Pages
- **Database**: Neon, PlanetScale (if not using Supabase)

---

## Pre-Deployment Checklist

Before deploying, ensure:

- [ ] All code is committed to Git
- [ ] Local testing is complete
- [ ] Environment variables are documented
- [ ] Database schema is finalized
- [ ] Stripe products are created
- [ ] You have a GitHub account
- [ ] You have a domain name (optional but recommended)

---

## Deploy Database

### Supabase Production Setup

**Good news**: If you followed the setup guide, your Supabase database is already production-ready!

Supabase provides:
- ✅ Automatic backups
- ✅ SSL connections
- ✅ Row Level Security
- ✅ 500MB free storage
- ✅ 2GB bandwidth/month

### Production Checklist

1. **Enable Database Backups**
   - Go to Supabase Dashboard > Settings > Database
   - Backups are automatic on free tier (daily)
   - Upgrade to Pro ($25/month) for point-in-time recovery

2. **Review RLS Policies**
   - Go to Authentication > Policies
   - Ensure all tables have proper RLS policies
   - Test with different user roles

3. **Set Up Database Monitoring**
   - Go to Reports
   - Monitor query performance
   - Set up alerts for high usage

4. **Secure API Keys**
   - Never commit `service_role` key to Git
   - Use `anon` key for frontend
   - Rotate keys if compromised

✅ **Database deployment complete!**

---

## Deploy Backend

### Option 1: Railway (Recommended)

**Why Railway?**
- Simple deployment
- Automatic HTTPS
- Environment variables UI
- $5/month for 500 hours
- Great for Node.js

#### Step 1: Create Railway Account

1. Go to https://railway.app
2. Sign up with GitHub
3. Verify email

#### Step 2: Create New Project

1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Connect your GitHub account
4. Select your PromptGenius repository
5. Railway will detect Node.js automatically

#### Step 3: Configure Build

1. Click on your service
2. Go to "Settings"
3. Set:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Watch Paths**: `backend/**`

#### Step 4: Add Environment Variables

1. Go to "Variables" tab
2. Click "Add Variable"
3. Add all variables from `backend/.env`:

```
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-frontend.vercel.app
JWT_SECRET=your-production-secret
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_KEY=your-service-key
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_PRICE_TIER1=price_...
STRIPE_PRICE_TIER2=price_...
STRIPE_PRICE_TIER3=price_...
STRIPE_PRICE_MONTHLY=price_...
```

**Important**: Use production Stripe keys (not test keys)!

#### Step 5: Deploy

1. Railway will auto-deploy
2. Wait 2-3 minutes
3. Check "Deployments" tab for status
4. Once deployed, you'll get a URL like: `https://your-app.railway.app`

#### Step 6: Test Backend

```bash
curl https://your-app.railway.app/health
```

Should return:
```json
{"status":"ok","message":"PromptGenius API is running"}
```

✅ **Backend deployed!**

### Option 2: Render

1. Go to https://render.com
2. New > Web Service
3. Connect GitHub repo
4. Root Directory: `backend`
5. Build Command: `npm install`
6. Start Command: `npm start`
7. Add environment variables
8. Create Web Service

---

## Deploy Frontend

### Vercel Deployment

**Why Vercel?**
- Built for React/Vite
- Automatic deployments on Git push
- Free tier is generous
- Excellent performance
- Easy custom domains

#### Step 1: Create Vercel Account

1. Go to https://vercel.com
2. Sign up with GitHub
3. Verify email

#### Step 2: Import Project

1. Click "Add New..." > "Project"
2. Import your GitHub repository
3. Vercel will detect Vite automatically

#### Step 3: Configure Build Settings

1. **Framework Preset**: Vite
2. **Root Directory**: `frontend`
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`
5. **Install Command**: `npm install`

#### Step 4: Add Environment Variables

Click "Environment Variables" and add:

```
VITE_API_URL=https://your-backend.railway.app
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

**Important**: Use your Railway backend URL!

#### Step 5: Deploy

1. Click "Deploy"
2. Wait 2-3 minutes
3. You'll get a URL like: `https://your-app.vercel.app`

#### Step 6: Test Frontend

1. Visit your Vercel URL
2. Try to register
3. Try to login
4. Create a prompt
5. Check if it saves to database

✅ **Frontend deployed!**

---

## Deploy Marketing Site

### Vercel Deployment (Same Process)

1. Create new Vercel project
2. Import same GitHub repo
3. Configure:
   - **Root Directory**: `marketing-website`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add environment variables:
   ```
   VITE_APP_URL=https://your-app.vercel.app
   VITE_API_URL=https://your-backend.railway.app
   ```
5. Deploy

✅ **Marketing site deployed!**

---

## Configure Custom Domain

### Step 1: Buy Domain

Recommended registrars:
- **Namecheap**: ~$10/year for .com
- **Cloudflare**: At-cost pricing (~$8-10/year)
- **Google Domains**: ~$12/year

Buy 2 domains (or use subdomains):
- `promptgenius.com` (marketing site)
- `app.promptgenius.com` (application)

### Step 2: Add Domain to Vercel

**For Marketing Site:**
1. Go to Vercel project > Settings > Domains
2. Add `promptgenius.com`
3. Vercel will show DNS records to add

**For App:**
1. Go to app project > Settings > Domains
2. Add `app.promptgenius.com`

### Step 3: Configure DNS

In your domain registrar (Namecheap, etc.):

1. Go to DNS settings
2. Add these records:

**For marketing site (promptgenius.com):**
```
Type: A
Host: @
Value: 76.76.21.21
TTL: Automatic
```

**For app (app.promptgenius.com):**
```
Type: CNAME
Host: app
Value: cname.vercel-dns.com
TTL: Automatic
```

**For backend (api.promptgenius.com):**
1. In Railway, go to Settings > Networking
2. Add custom domain: `api.promptgenius.com`
3. Railway will show CNAME record
4. Add to your DNS:
   ```
   Type: CNAME
   Host: api
   Value: [Railway's CNAME]
   TTL: Automatic
   ```

### Step 4: Wait for DNS Propagation

- Can take 5 minutes to 48 hours
- Usually works within 1 hour
- Check status: https://dnschecker.org

### Step 5: Update Environment Variables

**Frontend `.env`:**
```
VITE_API_URL=https://api.promptgenius.com
```

**Backend `.env`:**
```
FRONTEND_URL=https://app.promptgenius.com
```

**Marketing Site `.env`:**
```
VITE_APP_URL=https://app.promptgenius.com
VITE_API_URL=https://api.promptgenius.com
```

Redeploy all services after updating.

✅ **Custom domain configured!**

---

## Production Stripe Setup

### Step 1: Activate Stripe Account

1. Go to Stripe Dashboard
2. Complete business verification
3. Add bank account for payouts
4. Activate live mode

### Step 2: Create Production Products

Create the same 4 products as in test mode:
- Tier 1: $59 (one-time)
- Tier 2: $79 (one-time)
- Tier 3: $99 (one-time)
- Monthly: $49/month (recurring)

Copy the **live** Price IDs.

### Step 3: Get Live API Keys

1. Go to Developers > API keys
2. Toggle to "Live mode"
3. Copy:
   - Publishable key: `pk_live_...`
   - Secret key: `sk_live_...`

### Step 4: Update Environment Variables

**Backend (Railway):**
```
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_PRICE_TIER1=price_live_...
STRIPE_PRICE_TIER2=price_live_...
STRIPE_PRICE_TIER3=price_live_...
STRIPE_PRICE_MONTHLY=price_live_...
```

**Frontend (Vercel):**
```
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

### Step 5: Update Webhook

1. Developers > Webhooks
2. Add endpoint
3. URL: `https://api.promptgenius.com/api/payments/webhook`
4. Events:
   - `checkout.session.completed`
   - `customer.subscription.deleted`
5. Copy signing secret
6. Add to Railway:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_live_...
   ```

### Step 6: Test Live Payment

1. Go to your production app
2. Try to purchase Tier 1
3. Use real card (will charge $59!)
4. Or use Stripe test mode toggle in dashboard

✅ **Production Stripe configured!**

---

## Post-Deployment Testing

### Critical Tests

1. **User Registration**
   - [ ] Can register new account
   - [ ] Receives email (if configured)
   - [ ] User appears in Supabase

2. **Authentication**
   - [ ] Can login
   - [ ] Token persists on refresh
   - [ ] Can logout

3. **Prompt Management**
   - [ ] Can create prompt
   - [ ] Quality score calculates
   - [ ] Can edit prompt
   - [ ] Can delete prompt
   - [ ] Prompts persist in database

4. **Templates**
   - [ ] Can view templates
   - [ ] Can use template
   - [ ] Can create custom template

5. **Brand Voices**
   - [ ] Can create brand voice
   - [ ] Can edit brand voice
   - [ ] Can delete brand voice

6. **Payments**
   - [ ] Can view pricing page
   - [ ] Can click "Get Started"
   - [ ] Redirects to Stripe Checkout
   - [ ] Can complete payment
   - [ ] Tier updates in database
   - [ ] Redirects to success page

7. **Tier Limits**
   - [ ] Tier 1 limits work (100 prompts)
   - [ ] Tier 2 limits work (500 prompts)
   - [ ] Tier 3 is unlimited
   - [ ] Error messages show when limit hit

### Performance Tests

1. **Page Load Speed**
   - Use Google PageSpeed Insights
   - Target: 90+ score
   - Fix any issues

2. **API Response Time**
   - Test with Postman or curl
   - All endpoints should respond < 500ms

3. **Database Queries**
   - Check Supabase > Reports
   - Optimize slow queries

### Security Tests

1. **HTTPS Everywhere**
   - [ ] All URLs use HTTPS
   - [ ] No mixed content warnings

2. **API Authentication**
   - [ ] Can't access API without token
   - [ ] Invalid tokens are rejected
   - [ ] Expired tokens are rejected

3. **RLS Policies**
   - [ ] Users can't see other users' data
   - [ ] Users can't modify other users' data

4. **Environment Variables**
   - [ ] No secrets in frontend code
   - [ ] No secrets in Git repository

✅ **Post-deployment testing complete!**

---

## Monitoring and Maintenance

### Set Up Monitoring

**1. Vercel Analytics (Free)**
- Auto-enabled for frontend
- View in Vercel Dashboard > Analytics
- Track page views, performance

**2. Railway Metrics**
- View in Railway Dashboard
- Monitor CPU, memory, bandwidth
- Set up alerts for high usage

**3. Supabase Monitoring**
- View in Supabase > Reports
- Monitor database size, queries
- Set up alerts

**4. Stripe Dashboard**
- Monitor payments
- Track MRR (Monthly Recurring Revenue)
- View failed payments

### Uptime Monitoring

Use a free service:
- **UptimeRobot**: https://uptimerobot.com
- **Pingdom**: https://pingdom.com

Monitor:
- Frontend: `https://app.promptgenius.com`
- Backend: `https://api.promptgenius.com/health`
- Marketing: `https://promptgenius.com`

Get alerts if site goes down.

### Error Tracking

**Sentry (Recommended)**

1. Sign up at https://sentry.io
2. Create new project
3. Install in frontend:
   ```bash
   npm install @sentry/react
   ```
4. Add to `main.jsx`:
   ```javascript
   import * as Sentry from "@sentry/react";
   
   Sentry.init({
     dsn: "your-sentry-dsn",
     environment: "production",
   });
   ```

### Backup Strategy

**Database Backups:**
- Supabase: Automatic daily backups (free tier)
- Upgrade to Pro for point-in-time recovery

**Code Backups:**
- Git repository (already backed up on GitHub)
- Consider private repo for security

**Environment Variables:**
- Keep a secure copy (1Password, LastPass)
- Document all variables

### Maintenance Schedule

**Weekly:**
- [ ] Check error logs (Sentry)
- [ ] Review Stripe transactions
- [ ] Check uptime reports

**Monthly:**
- [ ] Update dependencies
- [ ] Review database size
- [ ] Check for security updates
- [ ] Review user feedback

**Quarterly:**
- [ ] Full security audit
- [ ] Performance optimization
- [ ] Database cleanup
- [ ] Review and update documentation

---

## Scaling Considerations

### When to Upgrade

**Supabase:**
- Free tier: 500MB database, 2GB bandwidth
- Upgrade to Pro ($25/month) when:
  - Database > 400MB
  - Bandwidth > 1.5GB/month
  - Need better performance

**Railway:**
- Free tier: 500 hours/month
- Upgrade to Pro ($5/month) when:
  - Need more hours
  - Need better performance
  - Need custom domains

**Vercel:**
- Free tier: 100GB bandwidth
- Upgrade to Pro ($20/month) when:
  - Bandwidth > 80GB
  - Need advanced analytics
  - Need team features

### Performance Optimization

**Frontend:**
- Enable Vercel Edge Network (auto-enabled)
- Use image optimization
- Lazy load components
- Implement code splitting

**Backend:**
- Add Redis caching (Upstash)
- Optimize database queries
- Use database indexes
- Implement rate limiting

**Database:**
- Add indexes on frequently queried columns
- Use database connection pooling
- Archive old data

---

## Rollback Plan

If deployment fails:

1. **Revert Git commit:**
   ```bash
   git revert HEAD
   git push
   ```
   Vercel and Railway will auto-deploy previous version

2. **Restore database:**
   - Go to Supabase > Database > Backups
   - Restore from previous backup

3. **Revert environment variables:**
   - Go to Railway/Vercel settings
   - Restore previous values

---

## Cost Breakdown

### Free Tier (First 6 months)

- Supabase: $0
- Railway: $5/month
- Vercel: $0
- Domain: $10/year
- **Total**: ~$5-6/month

### Growth Phase (1,000 users)

- Supabase Pro: $25/month
- Railway Pro: $20/month
- Vercel Pro: $20/month
- Domain: $10/year
- **Total**: ~$65-70/month

### Scale Phase (10,000 users)

- Supabase Pro: $25/month
- Railway: ~$50/month
- Vercel Pro: $20/month
- Sentry: $26/month
- **Total**: ~$120-130/month

Still very affordable!

---

## Launch Checklist

Before announcing your launch:

- [ ] All services deployed and tested
- [ ] Custom domain configured
- [ ] SSL certificates active (HTTPS)
- [ ] Production Stripe configured
- [ ] Test payment completed successfully
- [ ] Monitoring set up
- [ ] Error tracking configured
- [ ] Backup strategy in place
- [ ] Support email configured
- [ ] Privacy policy and terms of service added
- [ ] Analytics set up (Google Analytics, etc.)
- [ ] Social media accounts created
- [ ] AppSumo listing prepared

---

## Next Steps

1. ✅ Complete deployment
2. 📝 Prepare AppSumo listing (see `launch-materials/`)
3. 🎬 Create demo video
4. 📧 Set up email sequences
5. 🚀 Launch on AppSumo!

---

**Congratulations!** 🎉 PromptGenius is now live in production!

