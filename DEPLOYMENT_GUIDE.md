# Complete Deployment Guide for Prompt-U

This guide will walk you through deploying the new Prompt-U landing page with Supabase authentication to production.

---

## 📋 Prerequisites

Before you begin, make sure you have:
- [ ] GitHub account
- [ ] Vercel account (free tier is fine)
- [ ] Supabase account (free tier is fine)
- [ ] Domain configured (prompt-u.com)

---

## Phase 1: Set Up Supabase (15 minutes)

### Step 1.1: Create Supabase Project

1. Go to https://supabase.com
2. Click "Start your project" and sign in
3. Click "New Project"
4. Fill in:
   - **Name:** prompt-u
   - **Database Password:** (generate strong password - SAVE THIS!)
   - **Region:** Choose closest to your users (e.g., US East for North America)
5. Click "Create new project"
6. Wait 2-3 minutes for setup

### Step 1.2: Run Database Setup SQL

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Open the file `/deployment/SUPABASE_SETUP.md` in this repository
4. Copy the entire SQL script (starts with `-- Create users table`)
5. Paste into Supabase SQL Editor
6. Click "Run"
7. You should see "Success. No rows returned"

### Step 1.3: Get Your API Keys

1. In Supabase dashboard, go to **Settings** → **API**
2. Copy these values (you'll need them in Step 2):
   - **Project URL:** `https://xxxxx.supabase.co`
   - **anon public key:** `eyJ...` (long string starting with eyJ)

**IMPORTANT:** Save these values securely. You'll need them for Vercel deployment.

### Step 1.4: Configure Authentication URLs

1. Go to **Authentication** → **URL Configuration**
2. Add these Site URLs:
   - `http://localhost:5173` (for local development)
   - `https://prompt-u.com`
   - `https://www.prompt-u.com`
3. Add these Redirect URLs:
   - `http://localhost:5173/dashboard`
   - `https://prompt-u.com/dashboard`
   - `https://www.prompt-u.com/dashboard`
4. Click "Save"

### Step 1.5: Verify Setup

1. Go to **Table Editor**
2. You should see these tables:
   - profiles
   - brand_voices
   - prompts
   - prompt_versions
   - templates
3. Click "templates" - you should see 5 default templates

✅ **Supabase setup complete!**

---

## Phase 2: Deploy to Vercel (10 minutes)

### Step 2.1: Push New Frontend to GitHub

```bash
# Navigate to your repository
cd /path/to/promptgenius-repo

# Create a new branch for the deployment
git checkout -b deploy-new-landing-page

# Add the new frontend files
git add new-frontend/
git add DEPLOYMENT_GUIDE.md
git add deployment/SUPABASE_SETUP.md

# Commit the changes
git commit -m "Add new landing page with Supabase authentication"

# Push to GitHub
git push origin deploy-new-landing-page
```

### Step 2.2: Create Pull Request (Optional)

If you want to review changes before deploying:
1. Go to your GitHub repository
2. Click "Pull requests" → "New pull request"
3. Select `deploy-new-landing-page` branch
4. Review changes
5. Merge when ready

Or merge directly:
```bash
git checkout main
git merge deploy-new-landing-page
git push origin main
```

### Step 2.3: Connect to Vercel

1. Go to https://vercel.com
2. Click "Add New..." → "Project"
3. Import your `promptgenius` repository
4. Configure project:
   - **Framework Preset:** Other
   - **Root Directory:** `new-frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

### Step 2.4: Add Environment Variables

In Vercel project settings:

1. Go to **Settings** → **Environment Variables**
2. Add these variables:

| Name | Value | Environment |
|------|-------|-------------|
| `VITE_SUPABASE_URL` | `https://xxxxx.supabase.co` | Production, Preview, Development |
| `VITE_SUPABASE_ANON_KEY` | `eyJ...` | Production, Preview, Development |
| `VITE_SITE_URL` | `https://prompt-u.com` | Production |

**Where to get these values:**
- Get from Supabase dashboard → Settings → API (from Step 1.3)

3. Click "Save"

### Step 2.5: Deploy

1. Click "Deploy" in Vercel
2. Wait 2-3 minutes for build to complete
3. You'll get a URL like `https://prompt-u-xxxxx.vercel.app`
4. Test the deployment:
   - Visit the URL
   - Click "Sign Up" - modal should open
   - Try creating an account
   - Check Supabase dashboard → Authentication → Users to see new user

✅ **Vercel deployment complete!**

---

## Phase 3: Configure Custom Domain (5 minutes)

### Step 3.1: Add Domain to Vercel

1. In Vercel project, go to **Settings** → **Domains**
2. Add your domains:
   - `prompt-u.com`
   - `www.prompt-u.com`
3. Vercel will show you DNS records to add

### Step 3.2: Update DNS Records

1. Go to your domain registrar (Cloudflare, GoDaddy, etc.)
2. Add the DNS records Vercel provided:
   - **Type:** A or CNAME
   - **Name:** @ or www
   - **Value:** (from Vercel)
3. Save changes

### Step 3.3: Wait for DNS Propagation

- DNS changes can take 5 minutes to 48 hours
- Usually completes within 1 hour
- Check status in Vercel → Domains

### Step 3.4: Enable HTTPS

- Vercel automatically provisions SSL certificates
- Wait for "Valid Configuration" status in Vercel
- Test: Visit `https://prompt-u.com`

✅ **Custom domain configured!**

---

## Phase 4: Test Everything (10 minutes)

### Test Checklist

#### Landing Page
- [ ] Visit https://prompt-u.com
- [ ] All images load correctly
- [ ] Navigation links work (Features, Pricing, Blog, Video, Store)
- [ ] Smooth scrolling works
- [ ] Mobile responsive (test on phone)

#### Authentication
- [ ] Click "Sign Up" - modal opens
- [ ] Fill in signup form
- [ ] Submit - should show success message
- [ ] Check email for verification link
- [ ] Click verification link
- [ ] Click "Login" - modal opens
- [ ] Enter credentials and login
- [ ] Should redirect to `/dashboard`
- [ ] Dashboard shows "Welcome to Prompt-U"
- [ ] Click "Logout" - redirects to homepage

#### Blog
- [ ] Click "Blog" in navigation
- [ ] Blog post loads correctly
- [ ] Images display properly
- [ ] Links work

#### Store
- [ ] Click "Store" in navigation
- [ ] Store page loads
- [ ] Merchandise displays correctly
- [ ] "Coming Soon" badges visible

#### Supabase
- [ ] Go to Supabase dashboard → Authentication → Users
- [ ] See your test user
- [ ] Go to Table Editor → profiles
- [ ] See your profile record

✅ **All tests passed!**

---

## Phase 5: Update Old Frontend (Optional)

If you want to keep the old React app:

### Option A: Keep Both (Recommended)

1. Rename old frontend:
```bash
cd /path/to/promptgenius-repo
mv frontend frontend-old
mv new-frontend frontend
```

2. Update and push:
```bash
git add .
git commit -m "Replace frontend with new landing page"
git push origin main
```

3. Vercel will auto-deploy the changes

### Option B: Separate Deployments

- Keep old React app at `app.prompt-u.com`
- Keep new landing page at `prompt-u.com`
- Configure in Vercel → Domains

---

## Phase 6: Monitor and Maintain

### Daily Monitoring

1. **Check Supabase Usage:**
   - Dashboard → Usage
   - Monitor database size (500 MB free tier)
   - Monitor bandwidth (2 GB/month free tier)

2. **Check Vercel Usage:**
   - Dashboard → Usage
   - Monitor bandwidth (100 GB/month free tier)
   - Monitor build minutes (6000 min/month free tier)

3. **Check Authentication:**
   - Supabase → Authentication → Users
   - Monitor new signups
   - Check for suspicious activity

### Weekly Tasks

- [ ] Review error logs in Vercel
- [ ] Check Supabase logs for issues
- [ ] Test authentication flow
- [ ] Verify all pages load correctly

### Monthly Tasks

- [ ] Review and respond to user feedback
- [ ] Update content as needed
- [ ] Check for security updates
- [ ] Backup database (automatic in Supabase)

---

## Troubleshooting

### Issue: "Missing Supabase environment variables"

**Solution:**
1. Check Vercel → Settings → Environment Variables
2. Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set
3. Redeploy: Vercel → Deployments → ... → Redeploy

### Issue: "Login/Signup not working"

**Solution:**
1. Check browser console for errors (F12)
2. Verify Supabase URL is correct in environment variables
3. Check Supabase → Authentication → URL Configuration
4. Ensure your domain is in the allowed list

### Issue: "User created but not in profiles table"

**Solution:**
1. Check Supabase → SQL Editor
2. Verify the trigger `on_auth_user_created` exists
3. Test by creating a new user
4. Check Table Editor → profiles

### Issue: "Domain not working"

**Solution:**
1. Check DNS records in domain registrar
2. Verify records match Vercel's requirements
3. Wait up to 48 hours for DNS propagation
4. Use https://dnschecker.org to check status

### Issue: "Build failed in Vercel"

**Solution:**
1. Check Vercel → Deployments → Build Logs
2. Common issues:
   - Missing dependencies: Run `npm install` in `new-frontend/`
   - Wrong build command: Should be `npm run build`
   - Wrong output directory: Should be `dist`
3. Fix and redeploy

---

## Security Best Practices

### Environment Variables
- ✅ Never commit `.env` files to Git
- ✅ Use Vercel environment variables for secrets
- ✅ Rotate Supabase keys if compromised
- ✅ Use `anon` key in frontend (safe)
- ✅ Never use `service_role` key in frontend (dangerous)

### Authentication
- ✅ Email verification enabled by default
- ✅ Password minimum 8 characters
- ✅ Rate limiting enabled in Supabase
- ✅ HTTPS enforced by Vercel
- ✅ Consider enabling 2FA for admin accounts

### Database
- ✅ Row Level Security (RLS) enabled
- ✅ Users can only access their own data
- ✅ Regular backups (automatic in Supabase)
- ✅ Monitor for suspicious queries

---

## Rollback Plan

If something goes wrong:

### Quick Rollback (5 minutes)

1. Go to Vercel → Deployments
2. Find previous working deployment
3. Click "..." → "Promote to Production"
4. Previous version is now live

### Full Rollback (10 minutes)

```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or restore old frontend
mv frontend frontend-new
mv frontend-old frontend
git add .
git commit -m "Rollback to old frontend"
git push origin main
```

---

## Next Steps After Deployment

### Immediate (Week 1)
- [ ] Monitor authentication for issues
- [ ] Test on multiple devices and browsers
- [ ] Gather initial user feedback
- [ ] Set up Google Analytics (optional)

### Short-term (Month 1)
- [ ] Build out dashboard features
- [ ] Add prompt library functionality
- [ ] Implement quality score feature
- [ ] Create brand voice management

### Long-term (Quarter 1)
- [ ] Add team collaboration features
- [ ] Implement analytics dashboard
- [ ] Add payment integration (Stripe)
- [ ] Launch AppSumo lifetime deal

---

## Support Resources

### Documentation
- [Supabase Docs](https://supabase.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Vite Docs](https://vitejs.dev)

### Community
- [Supabase Discord](https://discord.supabase.com)
- [Vercel Discord](https://vercel.com/discord)

### Monitoring
- Vercel Dashboard: https://vercel.com/dashboard
- Supabase Dashboard: https://app.supabase.com

---

## Estimated Timeline

| Phase | Time | Status |
|-------|------|--------|
| Supabase Setup | 15 min | ⏳ Pending |
| Vercel Deployment | 10 min | ⏳ Pending |
| Custom Domain | 5 min + DNS wait | ⏳ Pending |
| Testing | 10 min | ⏳ Pending |
| **Total** | **40 min + DNS wait** | |

---

## Success Criteria

✅ Landing page live at https://prompt-u.com
✅ Users can sign up and create accounts
✅ Users can log in and access dashboard
✅ All navigation links work
✅ Blog and store pages accessible
✅ Mobile responsive
✅ HTTPS enabled
✅ No console errors
✅ Supabase authentication working
✅ User data stored in database

---

**You're ready to deploy! Follow the phases in order and check off items as you complete them.** 🚀

**Questions?** Refer to the troubleshooting section or check the support resources above.

