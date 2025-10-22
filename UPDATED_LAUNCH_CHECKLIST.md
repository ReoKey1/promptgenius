# PromptGenius - Updated Launch Checklist

**Updated:** October 22, 2025  
**Critical Addition:** Custom Domain Required for AppSumo

---

## 🚨 Phase 0: Custom Domain Setup (URGENT - Do First!)

**Priority:** CRITICAL - Required for AppSumo  
**Time:** 2-3 hours + DNS propagation  
**Cost:** $8-15/year

### Why This Comes First

AppSumo requires a professional custom domain. You cannot launch with:
- ❌ promptgenius-drab.vercel.app
- ❌ promptgenius-production.up.railway.app

You need:
- ✅ promptgenius.com (or similar)
- ✅ api.promptgenius.com

### Quick Start Guide

1. **Purchase Domain** (15 minutes)
   - Go to Namecheap.com or Cloudflare Registrar
   - Search for "promptgenius.com"
   - Purchase for 1-2 years ($8-15)
   - Enable WHOIS privacy (free)

2. **Connect to Vercel** (30 minutes)
   - Vercel Dashboard → Settings → Domains
   - Add "promptgenius.com"
   - Copy DNS records provided
   - Add to your domain registrar
   - Wait 10-30 minutes for verification

3. **Connect to Railway** (30 minutes)
   - Railway Dashboard → Settings → Domains
   - Add "api.promptgenius.com"
   - Copy CNAME record provided
   - Add to your domain registrar
   - Wait 10-30 minutes for verification

4. **Update Environment Variables** (15 minutes)
   - Railway: Change `FRONTEND_URL` to https://promptgenius.com
   - Vercel: Change `VITE_API_URL` to https://api.promptgenius.com
   - Stripe: Update webhook URL to https://api.promptgenius.com/api/payments/webhook

5. **Update Code** (30 minutes)
   - Update CORS configuration in backend
   - Test all functionality
   - Commit and push changes

6. **Verify Everything Works** (30 minutes)
   - Visit https://promptgenius.com
   - Test registration and login
   - Verify API calls work
   - Check SSL certificates

**See CUSTOM_DOMAIN_SETUP.md for detailed instructions**

---

## ✅ Revised Launch Timeline

### Week 0: Domain Setup (Days 1-2)
- **Day 1:** Purchase and configure domain
- **Day 2:** Verify and test everything

### Week 1: Critical Launch Prep (Days 3-9)
- **Days 3-4:** Stripe production + monitoring setup
- **Days 5-6:** Cross-browser and mobile testing
- **Days 7-9:** Demo video + screenshots

### Week 2: Beta Testing & Marketing (Days 10-16)
- **Days 10-11:** Recruit beta testers
- **Days 12-16:** Beta testing ongoing + gather testimonials

### Week 3: Feature Enhancement (Days 17-23)
- **Days 17-19:** Enhanced quality scoring
- **Days 20-21:** Rate limiting + security
- **Days 22-23:** Build out key frontend pages

### Week 4: Launch Preparation (Days 24-30)
- **Days 24-25:** Finalize AppSumo listing
- **Days 26-27:** Final testing and bug fixes
- **Days 28-30:** Submit to AppSumo

**Total Time to Launch:** 3-4 weeks (including domain setup)

---

## 📋 Complete Pre-Launch Checklist

### Infrastructure (Week 0-1)
- [ ] Custom domain purchased (promptgenius.com)
- [ ] Domain connected to Vercel (frontend)
- [ ] Domain connected to Railway (backend)
- [ ] SSL certificates active on both
- [ ] Environment variables updated
- [ ] CORS configuration updated
- [ ] All functionality tested on new domain
- [ ] Stripe production mode enabled
- [ ] Stripe webhook URL updated
- [ ] Error monitoring (Sentry) set up
- [ ] Uptime monitoring (UptimeRobot) set up

### Testing (Week 1-2)
- [ ] Cross-browser testing complete
  - [ ] Chrome
  - [ ] Firefox
  - [ ] Safari
  - [ ] Edge
- [ ] Mobile testing complete
  - [ ] iPhone (Safari)
  - [ ] Android (Chrome)
  - [ ] iPad
  - [ ] Android tablet
- [ ] Payment flow tested with real card
- [ ] Webhook events verified
- [ ] Beta testing with 10-20 users
- [ ] All major bugs fixed

### Marketing Materials (Week 2-3)
- [ ] Demo video created (2-3 minutes)
- [ ] Professional screenshots taken (7+)
- [ ] Testimonials gathered (5-10)
- [ ] AppSumo listing finalized
- [ ] Feature comparison chart created
- [ ] FAQ section written
- [ ] Pricing tiers confirmed

### Final Checks (Week 3-4)
- [ ] All features working correctly
- [ ] No console errors
- [ ] Fast load times (< 3 seconds)
- [ ] Professional email set up (support@promptgenius.com)
- [ ] Privacy policy created
- [ ] Terms of service created
- [ ] Refund policy defined
- [ ] Customer support process established

---

## 🎯 AppSumo Submission Requirements

### Technical Requirements
✅ Custom domain (promptgenius.com)  
✅ HTTPS enabled (SSL certificate)  
✅ Fully functional application  
✅ Payment integration working  
✅ No major bugs or errors  
✅ Fast performance (< 3 second load)  
✅ Mobile responsive  
✅ Cross-browser compatible  

### Marketing Requirements
✅ Demo video (2-3 minutes)  
✅ Professional screenshots (7+ images)  
✅ Compelling product description  
✅ Clear value proposition  
✅ 3-tier pricing structure  
✅ Feature comparison  
✅ FAQ section  
✅ Testimonials (5-10)  
✅ Guarantee/refund policy  

### Business Requirements
✅ Professional email address  
✅ Privacy policy  
✅ Terms of service  
✅ Customer support process  
✅ Refund policy  
✅ Company information  

---

## 💰 Updated Cost Summary

### One-Time Costs
- Domain registration: $8-15/year
- (Optional) Logo design: $0-100
- (Optional) Professional video editing: $0-200

### Monthly Costs (First 6 Months)
- Vercel: $0 (free tier sufficient)
- Railway: $0-5 (free $5 credit/month)
- Supabase: $0 (free tier sufficient)
- Stripe: $0 + 2.9% + $0.30 per transaction
- Sentry: $0 (free tier sufficient)
- UptimeRobot: $0 (free tier sufficient)
- **Total: $8-20/year + transaction fees**

### After Revenue Starts
- Consider upgrading to:
  - Google Workspace: $6/user/month (professional email)
  - Paid monitoring: $10-20/month (better features)
  - Paid hosting: $20-50/month (if needed)

---

## 🚀 Priority Order (Updated)

### Do TODAY
1. ✅ Purchase custom domain
2. ✅ Configure DNS for Vercel
3. ✅ Configure DNS for Railway
4. ✅ Update environment variables
5. ✅ Test everything works

### Do This Week
1. ✅ Switch Stripe to production
2. ✅ Set up error monitoring
3. ✅ Set up uptime monitoring
4. ✅ Cross-browser testing
5. ✅ Mobile testing

### Do Next Week
1. ✅ Create demo video
2. ✅ Take screenshots
3. ✅ Recruit beta testers
4. ✅ Start gathering feedback

### Do Week 3-4
1. ✅ Enhance quality scoring
2. ✅ Build out frontend pages
3. ✅ Finalize AppSumo listing
4. ✅ Submit to AppSumo

---

## 📊 Success Metrics

### Week 1 Goals
- [ ] Custom domain live and working
- [ ] Stripe accepting real payments
- [ ] Monitoring systems active
- [ ] No critical bugs

### Week 2 Goals
- [ ] 10+ beta testers recruited
- [ ] Demo video completed
- [ ] 5+ testimonials collected
- [ ] Cross-browser testing done

### Week 3 Goals
- [ ] All frontend pages functional
- [ ] Quality scoring enhanced
- [ ] AppSumo listing drafted
- [ ] All feedback addressed

### Week 4 Goals
- [ ] AppSumo submission complete
- [ ] All requirements met
- [ ] Launch-ready
- [ ] 🎉 LIVE ON APPSUMO

---

## 🎯 Critical Path

The **critical path** to launch (cannot be parallelized):

1. **Domain Setup** (2-3 hours) → BLOCKING EVERYTHING
2. **Stripe Production** (1-2 hours) → BLOCKING REVENUE
3. **Demo Video** (4-6 hours) → BLOCKING APPSUMO SUBMISSION
4. **Beta Testing** (5-7 days) → BLOCKING TESTIMONIALS
5. **AppSumo Submission** (2-3 hours) → BLOCKING LAUNCH

**Minimum Time to Launch:** 2-3 weeks if following critical path

---

## 💡 Key Insights

### What Changed
- **Added Phase 0:** Custom domain setup (CRITICAL)
- **Updated timeline:** Now 3-4 weeks instead of 2-3
- **Added costs:** Domain registration ($8-15/year)
- **Updated checklist:** Domain-related tasks

### What Stayed the Same
- Core application is production-ready
- All features working correctly
- Security measures in place
- Testing methodology

### Why Domain Matters
- **Professional appearance:** promptgenius.com vs promptgenius-drab.vercel.app
- **Customer trust:** Custom domain shows legitimacy
- **AppSumo requirement:** Marketplace standard
- **Long-term branding:** Own your domain forever
- **SEO benefits:** Better search rankings

---

## 📞 Support Resources

### Domain Setup Help
- Namecheap Support: https://www.namecheap.com/support/
- Vercel Docs: https://vercel.com/docs/concepts/projects/domains
- Railway Docs: https://docs.railway.app/deploy/custom-domains

### AppSumo Seller Resources
- AppSumo Seller Guide: https://sell.appsumo.com/g
- AppSumo Requirements: https://sell.appsumo.com/g/requirements
- AppSumo Support: partners@appsumo.com

---

## ✅ Next Action

**IMMEDIATE:** Purchase domain (promptgenius.com if available)

**Steps:**
1. Go to Namecheap.com or Cloudflare Registrar
2. Search for "promptgenius.com"
3. Purchase for 1 year ($8-15)
4. Follow CUSTOM_DOMAIN_SETUP.md guide
5. Test everything works
6. Continue with Phase 1 of improvement roadmap

**Time Estimate:** 2-3 hours today + overnight DNS propagation

**After Domain Setup:** Continue with Stripe production mode (Phase 1, Task 1.1)

---

**Updated Timeline to Launch:** 3-4 weeks  
**Critical Blocker:** Custom domain (do first!)  
**Success Probability:** 85%+ with proper execution

---

**Remember:** The domain is your digital real estate. Buy it today, own it forever. Everything else builds on top of this foundation.

🚀 **Let's get that domain set up!**

