# Prompt-U Deployment Checklist

Use this checklist to deploy Prompt-U step by step.

---

## ✅ Pre-Deployment Checklist

- [ ] You have a GitHub account
- [ ] You have prompt-u.com domain
- [ ] You have 30 minutes available
- [ ] You have this project folder ready

---

## 📋 Step 1: Supabase Setup (10 min)

### Create Project
- [ ] Go to https://supabase.com
- [ ] Click "New Project"
- [ ] Name: `prompt-u`
- [ ] Generate database password
- [ ] **SAVE PASSWORD:** ________________
- [ ] Choose region: US East
- [ ] Click "Create new project"
- [ ] Wait 2-3 minutes

### Run SQL Setup
- [ ] Click "SQL Editor" in left sidebar
- [ ] Click "+ New query" button
- [ ] Open `deployment/SUPABASE_SETUP.md`
- [ ] Copy entire SQL script
- [ ] Paste into new query tab
- [ ] Click "Run" button
- [ ] Verify: "Success. No rows returned"

### Get API Keys
- [ ] Click "Settings" → "API"
- [ ] Copy Project URL: ________________
- [ ] Copy anon public key: ________________
- [ ] **SAVE THESE - You'll need them next!**

### Configure Auth
- [ ] Click "Authentication" → "URL Configuration"
- [ ] Add Site URL: `https://prompt-u.com`
- [ ] Add Redirect URL: `https://prompt-u.com/dashboard`
- [ ] Click "Save"

**✅ Supabase Complete!**

---

## 📋 Step 2: GitHub Setup (5 min)

### Push to GitHub
- [ ] Open terminal in prompt-u folder
- [ ] Run: `git remote add origin https://github.com/YOUR_USERNAME/prompt-u.git`
- [ ] Run: `git push -u origin main`
- [ ] Verify files appear on GitHub

**✅ GitHub Complete!**

---

## 📋 Step 3: Vercel Deployment (10 min)

### Import Project
- [ ] Go to https://vercel.com
- [ ] Sign in with GitHub
- [ ] Click "Add New..." → "Project"
- [ ] Find and select `prompt-u` repository
- [ ] Click "Import"

### Configure Build
- [ ] Framework Preset: Vite (auto-detected)
- [ ] Root Directory: `./` (leave empty)
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`

### Add Environment Variables
- [ ] Click "Environment Variables"

**Variable 1:**
- [ ] Name: `VITE_SUPABASE_URL`
- [ ] Value: (paste from Step 1)
- [ ] Environments: All

**Variable 2:**
- [ ] Name: `VITE_SUPABASE_ANON_KEY`
- [ ] Value: (paste from Step 1)
- [ ] Environments: All

**Variable 3:**
- [ ] Name: `VITE_SITE_URL`
- [ ] Value: `https://prompt-u.com`
- [ ] Environments: Production

### Deploy
- [ ] Click "Deploy"
- [ ] Wait 2-3 minutes
- [ ] Copy deployment URL: ________________
- [ ] Click URL to test site

**✅ Vercel Complete!**

---

## 📋 Step 4: Domain Setup (5 min + DNS wait)

### Add Domain in Vercel
- [ ] In Vercel project, click "Settings"
- [ ] Click "Domains"
- [ ] Add: `prompt-u.com`
- [ ] Add: `www.prompt-u.com`
- [ ] Note the DNS records shown

### Update DNS
- [ ] Go to your domain registrar
- [ ] Find DNS settings
- [ ] Add A record:
  - Type: A
  - Name: @
  - Value: (from Vercel)
- [ ] Add CNAME record:
  - Type: CNAME
  - Name: www
  - Value: (from Vercel)
- [ ] Save changes

### Wait for DNS
- [ ] Check Vercel → Domains for "Valid Configuration" ✅
- [ ] Usually 5-30 minutes
- [ ] Check: https://dnschecker.org

**✅ Domain Complete!**

---

## 📋 Step 5: Testing (5 min)

### Test Landing Page
- [ ] Visit https://prompt-u.com
- [ ] All images load
- [ ] Navigation works
- [ ] Mobile responsive

### Test Authentication
- [ ] Click "Sign Up"
- [ ] Create test account
- [ ] Check email
- [ ] Click verification link
- [ ] Log in
- [ ] Access dashboard
- [ ] Log out

### Test Pages
- [ ] Blog page loads
- [ ] Store page loads
- [ ] All links work

### Verify Database
- [ ] Supabase → Authentication → Users
- [ ] See your test user
- [ ] Table Editor → profiles
- [ ] See your profile

**✅ Testing Complete!**

---

## 🎉 Deployment Complete!

Your Prompt-U site is now live at:
- ✅ https://prompt-u.com
- ✅ https://prompt-u.com/dashboard
- ✅ https://prompt-u.com/blog
- ✅ https://prompt-u.com/store

---

## 📊 Summary

| Step | Time | Status |
|------|------|--------|
| Supabase Setup | 10 min | ⬜ |
| GitHub Push | 5 min | ⬜ |
| Vercel Deploy | 10 min | ⬜ |
| Domain Config | 5 min | ⬜ |
| Testing | 5 min | ⬜ |
| **Total** | **35 min** | |

---

## 🆘 Having Issues?

See `deployment/QUICK_START.md` for detailed troubleshooting.

---

**Check off items as you complete them!** ✅

