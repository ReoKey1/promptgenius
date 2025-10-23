# Quick Start Checklist - Deploy Prompt-U in 40 Minutes

Follow these steps in order to deploy your new Prompt-U landing page with authentication.

---

## ✅ Step 1: Set Up Supabase (15 minutes)

### 1.1 Create Project
- [ ] Go to https://supabase.com and sign in
- [ ] Click "New Project"
- [ ] Name: `prompt-u`
- [ ] Generate and **SAVE** database password
- [ ] Choose region (US East recommended)
- [ ] Click "Create new project"
- [ ] Wait 2-3 minutes

### 1.2 Run SQL Setup
- [ ] Go to **SQL Editor** in Supabase dashboard
- [ ] Click "New query"
- [ ] Open `/deployment/SUPABASE_SETUP.md` from your repo
- [ ] Copy the entire SQL script (starts at line with `-- Create users table`)
- [ ] Paste into SQL Editor
- [ ] Click "Run"
- [ ] Verify: "Success. No rows returned"

### 1.3 Get API Keys
- [ ] Go to **Settings** → **API**
- [ ] Copy **Project URL**: `https://xxxxx.supabase.co`
- [ ] Copy **anon public key**: `eyJ...`
- [ ] **SAVE THESE** - you'll need them for Vercel

### 1.4 Configure URLs
- [ ] Go to **Authentication** → **URL Configuration**
- [ ] Add Site URLs:
  - `http://localhost:5173`
  - `https://prompt-u.com`
  - `https://www.prompt-u.com`
- [ ] Add Redirect URLs:
  - `http://localhost:5173/dashboard`
  - `https://prompt-u.com/dashboard`
  - `https://www.prompt-u.com/dashboard`
- [ ] Click "Save"

### 1.5 Verify
- [ ] Go to **Table Editor**
- [ ] Confirm tables exist: profiles, brand_voices, prompts, prompt_versions, templates
- [ ] Click "templates" - should see 5 default templates

---

## ✅ Step 2: Deploy to Vercel (10 minutes)

### 2.1 Merge to Main Branch
- [ ] Go to https://github.com/ReoKey1/promptgenius
- [ ] You should see banner: "deploy-new-landing-page had recent pushes"
- [ ] Click "Compare & pull request"
- [ ] Review changes
- [ ] Click "Create pull request"
- [ ] Click "Merge pull request"
- [ ] Click "Confirm merge"

### 2.2 Connect to Vercel
- [ ] Go to https://vercel.com and sign in
- [ ] Click "Add New..." → "Project"
- [ ] Find and import `promptgenius` repository
- [ ] Configure:
  - **Framework Preset:** Other
  - **Root Directory:** `new-frontend`
  - **Build Command:** `npm run build`
  - **Output Directory:** `dist`

### 2.3 Add Environment Variables
- [ ] In Vercel, go to **Settings** → **Environment Variables**
- [ ] Add variable 1:
  - **Name:** `VITE_SUPABASE_URL`
  - **Value:** (paste from Step 1.3)
  - **Environments:** All (Production, Preview, Development)
- [ ] Add variable 2:
  - **Name:** `VITE_SUPABASE_ANON_KEY`
  - **Value:** (paste from Step 1.3)
  - **Environments:** All (Production, Preview, Development)
- [ ] Add variable 3:
  - **Name:** `VITE_SITE_URL`
  - **Value:** `https://prompt-u.com`
  - **Environments:** Production only
- [ ] Click "Save" for each

### 2.4 Deploy
- [ ] Click "Deploy"
- [ ] Wait 2-3 minutes for build
- [ ] Copy the deployment URL: `https://prompt-u-xxxxx.vercel.app`
- [ ] Open URL in browser to test

---

## ✅ Step 3: Configure Domain (5 minutes + DNS wait)

### 3.1 Add Domain in Vercel
- [ ] In Vercel project, go to **Settings** → **Domains**
- [ ] Click "Add"
- [ ] Enter: `prompt-u.com`
- [ ] Click "Add"
- [ ] Repeat for: `www.prompt-u.com`
- [ ] Note the DNS records Vercel shows

### 3.2 Update DNS
- [ ] Go to your domain registrar (Cloudflare, GoDaddy, etc.)
- [ ] Find DNS settings
- [ ] Add/update A record:
  - **Type:** A
  - **Name:** @
  - **Value:** (from Vercel)
- [ ] Add/update CNAME record:
  - **Type:** CNAME
  - **Name:** www
  - **Value:** (from Vercel)
- [ ] Save changes

### 3.3 Wait for DNS
- [ ] Check Vercel → Domains for "Valid Configuration" status
- [ ] Usually takes 5-60 minutes
- [ ] Can take up to 48 hours
- [ ] Use https://dnschecker.org to check propagation

---

## ✅ Step 4: Test Everything (10 minutes)

### Test Landing Page
- [ ] Visit https://prompt-u.com
- [ ] All images load
- [ ] Navigation works (Features, Pricing, Blog, Video, Store)
- [ ] Smooth scrolling works
- [ ] Test on mobile device

### Test Authentication
- [ ] Click "Sign Up" button
- [ ] Modal opens
- [ ] Fill in: Name, Email, Password
- [ ] Submit form
- [ ] See success message
- [ ] Check email for verification link
- [ ] Click verification link in email
- [ ] Return to site, click "Login"
- [ ] Enter credentials
- [ ] Click "Log In"
- [ ] Redirects to `/dashboard`
- [ ] Dashboard shows "Welcome to Prompt-U"
- [ ] Click "Logout"
- [ ] Redirects to homepage

### Test Blog
- [ ] Click "Blog" in navigation
- [ ] Blog post loads
- [ ] Images display
- [ ] Content readable

### Test Store
- [ ] Click "Store" in navigation
- [ ] Store page loads
- [ ] Merchandise displays
- [ ] "Coming Soon" badges visible

### Verify Database
- [ ] Go to Supabase dashboard
- [ ] **Authentication** → **Users**
- [ ] See your test user
- [ ] **Table Editor** → **profiles**
- [ ] See your profile record

---

## 🎉 Success!

If all checkboxes are checked, your deployment is complete!

**Your new landing page is live at:** https://prompt-u.com

---

## 📊 What You've Deployed

✅ **Marketing Landing Page**
- Professional design with SEO optimization
- Login/Signup modals with Supabase authentication
- Pain points and solutions sections
- Pricing tiers
- Social proof and testimonials

✅ **Blog**
- SEO-optimized article on AI prompt pain points
- Professional formatting
- Internal linking to landing page

✅ **Store**
- Merchandise showcase
- Ready for Printify integration
- Three t-shirt designs

✅ **Dashboard**
- Protected route (requires login)
- Placeholder for future features
- Logout functionality

✅ **Authentication System**
- Supabase-powered auth
- Email verification
- Password reset capability
- Secure user data storage

---

## 🚀 Next Steps

### Immediate
- [ ] Share the new site with your team
- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on multiple devices (Desktop, Tablet, Mobile)
- [ ] Create 2-3 more test accounts

### This Week
- [ ] Set up Google Analytics (optional)
- [ ] Connect Printify for merchandise (if ready)
- [ ] Start building out dashboard features
- [ ] Gather user feedback

### This Month
- [ ] Implement prompt library
- [ ] Add quality score feature
- [ ] Build brand voice management
- [ ] Add payment integration (Stripe)

---

## 🆘 Need Help?

### Common Issues

**"Missing Supabase environment variables"**
→ Check Vercel → Settings → Environment Variables
→ Redeploy if needed

**"Login not working"**
→ Check browser console (F12) for errors
→ Verify Supabase URL in environment variables
→ Check Supabase → Authentication → URL Configuration

**"Domain not working"**
→ Check DNS records in domain registrar
→ Wait up to 48 hours for DNS propagation
→ Use https://dnschecker.org to check status

### Documentation
- Full deployment guide: `/DEPLOYMENT_GUIDE.md`
- Supabase setup: `/deployment/SUPABASE_SETUP.md`
- Troubleshooting: See DEPLOYMENT_GUIDE.md

### Support Resources
- [Supabase Docs](https://supabase.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Supabase Discord](https://discord.supabase.com)

---

## 📈 Timeline

| Step | Estimated Time | Your Time |
|------|----------------|-----------|
| Supabase Setup | 15 min | ___ min |
| Vercel Deploy | 10 min | ___ min |
| Domain Config | 5 min | ___ min |
| Testing | 10 min | ___ min |
| **Total** | **40 min** | **___ min** |

*(Plus DNS propagation: 5 min - 48 hours)*

---

**Ready to start? Begin with Step 1!** ✨

