# Custom Domain Setup for PromptGenius

**Current URLs:**
- Frontend: https://promptgenius-drab.vercel.app
- Backend: https://promptgenius-production.up.railway.app

**Goal:** Professional custom domain for AppSumo launch

---

## Why You Need a Custom Domain

### AppSumo Requirements
- Professional appearance and credibility
- Custom domain shows you're serious
- Easier for customers to remember
- Better for branding and marketing
- Required for most marketplace listings

### Benefits Beyond AppSumo
- Better SEO rankings
- Professional email addresses
- Brand consistency
- Customer trust
- Long-term ownership

---

## Step 1: Choose and Purchase a Domain

### Recommended Domain Options

**Option 1: promptgenius.com** (Ideal)
- Most professional
- Easy to remember
- Matches brand perfectly

**Option 2: promptgenius.io** (Tech-focused)
- Popular for SaaS products
- Modern and tech-savvy
- Good alternative if .com is taken

**Option 3: promptgenius.ai** (AI-focused)
- Emphasizes AI aspect
- Trendy for AI tools
- More expensive

**Option 4: getpromptgenius.com** (Action-oriented)
- Common SaaS pattern
- Available if others are taken
- Still professional

### Where to Buy Domains

**Recommended Registrars:**

1. **Namecheap** (Best Value)
   - URL: https://www.namecheap.com
   - Price: $8-12/year for .com
   - Free WHOIS privacy
   - Easy DNS management
   - Good customer support

2. **Google Domains** → **Squarespace Domains**
   - URL: https://domains.google.com (redirects to Squarespace)
   - Price: $12/year for .com
   - Clean interface
   - Integrated with Google services
   - Note: Google Domains sold to Squarespace

3. **Cloudflare Registrar** (At-Cost Pricing)
   - URL: https://www.cloudflare.com/products/registrar/
   - Price: Wholesale cost (~$9/year)
   - No markup
   - Free SSL
   - Requires Cloudflare account

4. **Porkbun** (Budget-Friendly)
   - URL: https://porkbun.com
   - Price: $7-10/year
   - Free WHOIS privacy
   - Free SSL certificates
   - Good for startups

**Avoid:** GoDaddy (expensive renewals), Domain.com (upsells)

### Domain Purchase Steps

1. **Search for availability**
   - Check promptgenius.com first
   - Have 2-3 backup options ready

2. **Purchase for 1-2 years**
   - 1 year is fine to start
   - 2 years shows commitment (optional)

3. **Enable WHOIS privacy**
   - Protects your personal information
   - Usually free with good registrars

4. **Skip upsells**
   - Don't need email hosting (yet)
   - Don't need website builder
   - Don't need extra SSL (Vercel/Railway provide free)

**Estimated Cost:** $8-15/year

---

## Step 2: Configure DNS Settings

### Understanding DNS Records

You'll need to create two types of DNS records:

**A Record** or **CNAME Record:**
- Points your domain to your server
- Used for www.promptgenius.com

**CNAME Record:**
- Creates subdomain aliases
- Used for api.promptgenius.com

### Recommended Domain Structure

```
promptgenius.com              → Frontend (Vercel)
www.promptgenius.com          → Frontend (Vercel)
api.promptgenius.com          → Backend (Railway)
app.promptgenius.com          → Frontend (alternative)
```

---

## Step 3: Connect Domain to Vercel (Frontend)

### In Vercel Dashboard

1. **Go to your project**
   - https://vercel.com/dashboard
   - Select "promptgenius" project

2. **Click "Settings" → "Domains"**

3. **Add your domain**
   - Enter: `promptgenius.com`
   - Click "Add"

4. **Vercel will provide DNS records**
   - You'll see something like:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

5. **Copy these values** (you'll add them to your registrar)

### In Your Domain Registrar (e.g., Namecheap)

1. **Log into your registrar**

2. **Find DNS Management**
   - Usually called "DNS Settings" or "Manage DNS"
   - Or "Advanced DNS" in Namecheap

3. **Add the A Record**
   ```
   Type: A Record
   Host: @ (or leave blank)
   Value: [IP from Vercel]
   TTL: Automatic (or 300)
   ```

4. **Add the CNAME Record**
   ```
   Type: CNAME Record
   Host: www
   Value: cname.vercel-dns.com
   TTL: Automatic (or 300)
   ```

5. **Save changes**

### Verify in Vercel

1. **Go back to Vercel**
2. **Wait 5-10 minutes** for DNS propagation
3. **Vercel will automatically verify**
4. **SSL certificate will be issued automatically** (free)
5. **Your site will be live at promptgenius.com**

**Note:** DNS can take up to 48 hours to fully propagate, but usually works within 10-30 minutes.

---

## Step 4: Connect Domain to Railway (Backend)

### In Railway Dashboard

1. **Go to your backend project**
   - https://railway.app/dashboard
   - Select your "promptgenius" backend

2. **Click "Settings"**

3. **Scroll to "Domains"**

4. **Click "Add Custom Domain"**

5. **Enter subdomain**
   - Enter: `api.promptgenius.com`
   - Click "Add"

6. **Railway will provide a CNAME record**
   ```
   Type: CNAME
   Name: api
   Value: [something].up.railway.app
   ```

### In Your Domain Registrar

1. **Go back to DNS Management**

2. **Add the CNAME Record**
   ```
   Type: CNAME Record
   Host: api
   Value: [value from Railway]
   TTL: Automatic (or 300)
   ```

3. **Save changes**

### Verify in Railway

1. **Go back to Railway**
2. **Wait 5-10 minutes**
3. **Railway will verify automatically**
4. **SSL certificate issued automatically**
5. **Your API will be live at api.promptgenius.com**

---

## Step 5: Update Environment Variables

### Update Backend Environment Variables (Railway)

**Change:**
```
FRONTEND_URL=https://promptgenius-drab.vercel.app
```

**To:**
```
FRONTEND_URL=https://promptgenius.com
```

### Update Frontend Environment Variables (Vercel)

**Change:**
```
VITE_API_URL=https://promptgenius-production.up.railway.app
```

**To:**
```
VITE_API_URL=https://api.promptgenius.com
```

### Update Stripe Webhook URL

1. **Go to Stripe Dashboard**
   - https://dashboard.stripe.com

2. **Go to Developers → Webhooks**

3. **Click on your webhook**

4. **Update endpoint URL**
   - Change from: `https://promptgenius-production.up.railway.app/api/payments/webhook`
   - To: `https://api.promptgenius.com/api/payments/webhook`

5. **Save changes**

---

## Step 6: Update Application Code

### Update CORS Configuration

**In `backend/server.js`:**

```javascript
const cors = require('cors');

const allowedOrigins = [
  'https://promptgenius.com',
  'https://www.promptgenius.com',
  'http://localhost:5173', // Keep for local development
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
```

### Update API Client (Frontend)

**In `frontend/src/lib/api.js`:**

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'https://api.promptgenius.com';

// Rest of your API client code...
```

### Commit and Push Changes

```bash
cd /home/ubuntu/promptgenius
git add .
git commit -m "Update to custom domain: promptgenius.com"
git push origin master
```

Both Vercel and Railway will automatically redeploy with the new configuration.

---

## Step 7: Test Everything

### Frontend Testing

1. **Visit https://promptgenius.com**
   - Should load without SSL warnings
   - Should show your application

2. **Visit https://www.promptgenius.com**
   - Should also work (www redirect)

3. **Test registration**
   - Create a new account
   - Should work without CORS errors

4. **Test login**
   - Log in with test account
   - Should redirect to dashboard

### Backend Testing

1. **Test API endpoint**
   ```bash
   curl https://api.promptgenius.com/api/auth/login
   ```
   - Should return error about missing credentials (expected)
   - Should NOT return "Cannot GET" or 404

2. **Test from frontend**
   - All API calls should work
   - Check browser console for errors

### SSL Certificate Verification

1. **Check frontend SSL**
   - Click padlock in browser address bar
   - Should show valid certificate
   - Issued by Vercel

2. **Check backend SSL**
   - Visit https://api.promptgenius.com
   - Should show valid certificate
   - Issued by Railway

---

## Step 8: Set Up Email (Optional but Recommended)

### Why You Need Email

- **Professional communication:** support@promptgenius.com
- **Transactional emails:** Password resets, receipts
- **Marketing emails:** Announcements, updates
- **Support:** Customer inquiries

### Email Options

**Option 1: Google Workspace** (Recommended for Business)
- Cost: $6/user/month
- Professional Gmail interface
- 30GB storage per user
- Custom email: you@promptgenius.com
- Calendar, Drive, Docs included
- URL: https://workspace.google.com

**Option 2: Zoho Mail** (Budget-Friendly)
- Cost: Free for 1 user (5GB) or $1/user/month
- Good email interface
- Custom email: you@promptgenius.com
- Basic features included
- URL: https://www.zoho.com/mail/

**Option 3: Cloudflare Email Routing** (Free Forwarding)
- Cost: FREE
- Forwards to your existing email
- Example: support@promptgenius.com → your@gmail.com
- Can't send from custom domain (without additional setup)
- URL: https://www.cloudflare.com/products/email-routing/

**Option 4: SendGrid/Mailgun** (Transactional Only)
- Cost: Free tier available
- For automated emails only (password resets, receipts)
- Not for regular communication
- Requires code integration

### Recommended Setup

**For Launch:**
- Use Cloudflare Email Routing (free)
- Forward support@promptgenius.com to your Gmail
- Upgrade to Google Workspace later when revenue comes in

**After Revenue:**
- Upgrade to Google Workspace
- Professional email for team
- Better deliverability for transactional emails

---

## Step 9: Update Marketing Materials

### Update Everywhere

- [ ] AppSumo listing (when submitting)
- [ ] GitHub README
- [ ] Social media profiles
- [ ] Email signatures
- [ ] Business cards (if any)
- [ ] Demo video (if URL is shown)
- [ ] Documentation

### Create Redirects (Optional)

If you want app.promptgenius.com instead of just promptgenius.com:

**In Vercel:**
1. Add both domains
2. Set app.promptgenius.com as primary
3. Redirect promptgenius.com → app.promptgenius.com

---

## Troubleshooting

### Domain Not Working After 24 Hours

**Check DNS propagation:**
- Use https://dnschecker.org
- Enter your domain
- Check if DNS records are visible globally

**Common issues:**
- Wrong DNS records (double-check values)
- TTL too high (set to 300 or Automatic)
- Nameservers not updated (if you changed registrars)

### SSL Certificate Not Issued

**Vercel:**
- Can take up to 24 hours
- Verify DNS records are correct
- Try removing and re-adding domain

**Railway:**
- Usually instant
- Check CNAME record is correct
- Contact Railway support if needed

### CORS Errors After Domain Change

**Check:**
- FRONTEND_URL in Railway matches new domain
- CORS allowedOrigins includes new domain
- Both have been deployed (check deployment logs)

**Fix:**
- Update environment variables
- Redeploy both frontend and backend
- Clear browser cache

### Stripe Webhook Not Working

**Check:**
- Webhook URL updated in Stripe dashboard
- URL is https://api.promptgenius.com/api/payments/webhook
- Webhook signing secret is correct in Railway
- Test webhook in Stripe dashboard

---

## Cost Summary

### One-Time Costs
- Domain registration: $8-15/year
- (Optional) Premium domain: $100-1,000+ one-time

### Ongoing Costs
- Domain renewal: $8-15/year
- Email (optional): $0-72/year
- **Total minimum:** $8-15/year

### Free Forever
- Vercel hosting (Hobby plan)
- Railway hosting ($5 credit/month, usually enough)
- SSL certificates (included)
- DNS management (included)

---

## Recommended Domain for PromptGenius

### First Choice: **promptgenius.com**
- Most professional
- Easy to remember
- Matches brand perfectly
- Worth paying premium if available

### Second Choice: **promptgenius.io**
- Tech-focused
- Modern
- Good alternative

### Third Choice: **getpromptgenius.com**
- Action-oriented
- Common SaaS pattern
- Professional

---

## Timeline

**Day 1:**
- Purchase domain (15 minutes)
- Configure DNS (30 minutes)
- Wait for propagation (10 minutes - 24 hours)

**Day 2:**
- Verify domain is working
- Update environment variables (15 minutes)
- Update code if needed (30 minutes)
- Test everything (30 minutes)

**Total Active Time:** 2-3 hours  
**Total Calendar Time:** 1-2 days

---

## AppSumo Requirements Checklist

Before submitting to AppSumo, ensure:

- [ ] Custom domain active (promptgenius.com)
- [ ] SSL certificate valid (https://)
- [ ] Professional email address (support@promptgenius.com)
- [ ] Stripe in production mode
- [ ] Payment flow working
- [ ] Demo video created
- [ ] Screenshots prepared
- [ ] Testimonials gathered
- [ ] Application fully functional
- [ ] No major bugs

---

## Next Steps

1. **Purchase domain** (promptgenius.com if available)
2. **Follow Steps 2-6** to configure DNS and connect to Vercel/Railway
3. **Test thoroughly** (Step 7)
4. **Set up email** (Step 8, optional but recommended)
5. **Update marketing materials** (Step 9)
6. **Submit to AppSumo** with professional domain

---

## Questions?

**Common Questions:**

**Q: Can I launch on AppSumo with the Vercel URL?**
A: Technically possible but not recommended. Custom domain looks much more professional and trustworthy.

**Q: What if promptgenius.com is taken?**
A: Try .io, .ai, or getpromptgenius.com. You can also contact the current owner to purchase.

**Q: Do I need email hosting right away?**
A: Not critical for launch. Use Cloudflare Email Routing (free) to forward to your Gmail initially.

**Q: Will changing domains break anything?**
A: No, as long as you update environment variables and CORS settings. Users won't notice.

**Q: How long does DNS take to propagate?**
A: Usually 10-30 minutes, but can take up to 48 hours in rare cases.

---

**Recommendation:** Purchase domain TODAY and set it up. This is a critical step for AppSumo launch and should be done before Phase 1 of the improvement roadmap.

**Estimated Cost:** $8-15/year  
**Time Required:** 2-3 hours active work  
**Priority:** HIGH - Required for AppSumo

