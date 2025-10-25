# Quick Start - Deploy Prompt-U in 30 Minutes

Follow these 3 simple steps to get Prompt-U live at prompt-u.com

---

## Step 1: Set Up Supabase (10 minutes)

### 1.1 Create Supabase Project
1. Go to https://supabase.com
2. Click "New Project"
3. Fill in:
   - Name: `prompt-u`
   - Database Password: (generate and SAVE it!)
   - Region: US East (or closest to you)
4. Click "Create new project"
5. Wait 2-3 minutes

### 1.2 Run Database Setup
1. In Supabase dashboard, click "SQL Editor" (left sidebar)
2. Click "+ New query" button
3. Open `deployment/SUPABASE_SETUP.md` in this folder
4. Copy the ENTIRE SQL script
5. Paste into the new query tab
6. Click "Run" button
7. Should see: "Success. No rows returned"

### 1.3 Get Your API Keys
1. Click "Settings" (left sidebar, bottom)
2. Click "API"
3. Copy these two values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public**: `eyJ...` (long string)
4. **SAVE THESE** - you'll need them in Step 2

### 1.4 Configure Auth URLs
1. Click "Authentication" (left sidebar)
2. Click "URL Configuration"
3. Add to "Site URL":
   - `https://prompt-u.com`
4. Add to "Redirect URLs":
   - `https://prompt-u.com/dashboard`
5. Click "Save"

✅ **Supabase setup complete!**

---

## Step 2: Deploy to Vercel (10 minutes)

### 2.1 Push to GitHub
```bash
cd prompt-u
git init
git add .
git commit -m "Initial Prompt-U deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/prompt-u.git
git push -u origin main
```

### 2.2 Import to Vercel
1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "Add New..." → "Project"
4. Find and select your `prompt-u` repository
5. Click "Import"

### 2.3 Configure Project
Leave these settings as default:
- **Framework Preset:** Vite
- **Root Directory:** ./
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

### 2.4 Add Environment Variables
Click "Environment Variables" and add:

**Variable 1:**
- Name: `VITE_SUPABASE_URL`
- Value: (paste from Step 1.3)
- Apply to: All environments

**Variable 2:**
- Name: `VITE_SUPABASE_ANON_KEY`
- Value: (paste from Step 1.3)
- Apply to: All environments

**Variable 3:**
- Name: `VITE_SITE_URL`
- Value: `https://prompt-u.com`
- Apply to: Production only

### 2.5 Deploy
1. Click "Deploy"
2. Wait 2-3 minutes
3. You'll get a URL like: `https://prompt-u-xxxxx.vercel.app`
4. Click the URL to test your site!

✅ **Vercel deployment complete!**

---

## Step 3: Connect Your Domain (10 minutes)

### 3.1 Add Domain in Vercel
1. In your Vercel project, click "Settings"
2. Click "Domains"
3. Type: `prompt-u.com`
4. Click "Add"
5. Repeat for: `www.prompt-u.com`
6. Vercel will show you DNS records to add

### 3.2 Update DNS Records
1. Go to your domain registrar (where you bought prompt-u.com)
2. Find "DNS Settings" or "DNS Management"
3. Add/Update these records:

**For prompt-u.com:**
- Type: A
- Name: @
- Value: (copy from Vercel)
- TTL: Auto or 3600

**For www.prompt-u.com:**
- Type: CNAME
- Name: www
- Value: (copy from Vercel)
- TTL: Auto or 3600

4. Save changes

### 3.3 Wait for DNS
- Check Vercel → Domains for "Valid Configuration" ✅
- Usually takes 5-30 minutes
- Can take up to 48 hours
- Check status: https://dnschecker.org

✅ **Domain connected!**

---

## 🧪 Test Your Site

### Test Landing Page
1. Visit https://prompt-u.com
2. All images should load
3. Click navigation links (Features, Pricing, Blog, Store)
4. Everything should work smoothly

### Test Authentication
1. Click "Sign Up" button
2. Fill in: Name, Email, Password
3. Click "Create Account"
4. Check your email
5. Click verification link
6. Return to site
7. Click "Login"
8. Enter your credentials
9. Should redirect to Dashboard
10. Click "Logout"

### Verify Database
1. Go to Supabase dashboard
2. Click "Authentication" → "Users"
3. You should see your test account
4. Click "Table Editor" → "profiles"
5. You should see your profile

✅ **Everything working!**

---

## 🎉 You're Live!

Your Prompt-U site is now live at:
- **Main site:** https://prompt-u.com
- **Dashboard:** https://prompt-u.com/dashboard
- **Blog:** https://prompt-u.com/blog
- **Store:** https://prompt-u.com/store

---

## 🆘 Troubleshooting

**Issue: "Missing Supabase environment variables"**
- Go to Vercel → Settings → Environment Variables
- Verify both VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set
- Click "Redeploy" in Vercel

**Issue: "Login not working"**
- Open browser console (F12)
- Check for error messages
- Verify Supabase URL is correct
- Check Auth URLs in Supabase dashboard

**Issue: "Domain not connecting"**
- Check DNS records match Vercel's requirements
- Wait longer (can take up to 48 hours)
- Use https://dnschecker.org to check propagation

**Issue: "Build failed"**
- Check Vercel → Deployments → Build Logs
- Verify all files are committed to GitHub
- Make sure package.json is in root directory

---

## 📞 Need More Help?

- **Full Guide:** See `DEPLOYMENT_GUIDE.md` in this folder
- **Supabase Docs:** https://supabase.com/docs
- **Vercel Docs:** https://vercel.com/docs
- **Support:** https://discord.supabase.com

---

## ⏱️ Total Time

- Step 1 (Supabase): 10 minutes
- Step 2 (Vercel): 10 minutes
- Step 3 (Domain): 10 minutes
- Testing: 5 minutes
- **Total: 35 minutes** (+ DNS wait)

---

**Congratulations! Your Prompt-U site is live!** 🚀

