# Vercel Deployment Guide

## ✅ Git Setup Complete!

Your project is now pushed to GitHub at: **https://github.com/shlok2345788/matrix**

---

## 🚀 Deploy on Vercel (4 Simple Steps)

### Step 1: Go to Vercel Dashboard
1. Visit https://vercel.com
2. Sign up with GitHub (if not already done)
3. Click **"New Project"**

### Step 2: Import Your Repository
1. Select your GitHub account
2. Search for **"matrix"** repository
3. Click **"Import"**

### Step 3: Configure Project Settings
Vercel will auto-detect your Vite configuration. You should see:
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

**No changes needed** - just click **"Deploy"**

### Step 4: Set Environment Variables (If Using Contact Form Email)
After deployment, go to **Settings → Environment Variables** and add:

```
EMAIL_USER = your-email@gmail.com
EMAIL_PASSWORD = your-app-password
ADMIN_EMAIL = admin@yourcompany.com
```

**Note**: Contact form will work without these for frontend testing.

---

## 📋 What Gets Deployed

**Frontend (Deployed on Vercel CDN)**:
- ✅ React + Vite SPA
- ✅ All CSS animations
- ✅ 3D components
- ✅ Contact form UI

**Backend (Optional - Requires Separate Setup)**:
- ⚠️ `server.js` won't run on Vercel's free tier
- Solution: Deploy backend to [Railway.app](https://railway.app) or [Heroku](https://www.heroku.com)
- Then update contact form API endpoint

---

## 🔗 Contact Form Backend Deployment Options

### Option A: Use Railway (Easiest - Free Tier Available)
1. Go to https://railway.app
2. Connect GitHub repo
3. Select `server.js` as start command
4. Add environment variables
5. Get deployed URL: `https://your-app.railway.app`
6. Update `ContactForm.jsx` line ~70 from `/api/contact` to your Railway URL

### Option B: Use Render (Free Tier)
1. Go to https://render.com
2. Create new Web Service
3. Connect GitHub repo
4. Set start command: `node server.js`
5. Add environment variables
6. Get deployed URL and update in `ContactForm.jsx`

### Option C: Keep Frontend-Only (No Email)
- Just deploy frontend to Vercel
- Contact form validates locally but doesn't send emails
- You can add email later with serverless functions

---

## 📝 Update Contact Form API Endpoint

If you deploy backend separately, update [ContactForm.jsx](src/ContactForm.jsx):

**Current (Line ~70)**:
```javascript
const response = await fetch('/api/contact', {
```

**Change to**:
```javascript
const response = await fetch('https://your-railway-url.railway.app/api/contact', {
```

---

## ✨ Your Deployment URL

After deployment on Vercel, you'll get a URL like:
- `https://matrix-shlok2345788.vercel.app`
- Or custom domain if configured

You can:
1. Share this link immediately
2. Add custom domain in Vercel Settings
3. Enable continuous deployment (auto-deploys on git push)

---

## 🔄 Continuous Deployment

Once deployed:
- Any push to `main` branch automatically redeploys
- Preview URLs for pull requests
- Automatic rollback available

Example workflow:
```bash
# Make changes locally
git add .
git commit -m "Update hero section"
git push origin main

# Automatically redeploys on Vercel!
```

---

## 🎯 Production Checklist

Before sharing your site:
- [ ] Visit your Vercel URL and test
- [ ] Click "Book Free Consultation" button
- [ ] Verify form opens and validates
- [ ] Test on mobile (responsive design)
- [ ] Check console for any errors (F12)
- [ ] Set up custom domain if needed
- [ ] Configure environment variables for email

---

## 🆘 Troubleshooting

### "Build failed" error
- Check `npm run build` works locally: `npm run build`
- Verify all imports are correct
- Check for TypeScript/ESLint errors

### Contact form not working
- Frontend validation works by default
- Email only works if backend deployed + env vars set
- Check browser Network tab (F12) for API errors

### Custom domain issues
- Add DNS records as shown in Vercel Settings
- May take 24-48 hours to propagate

---

## 📞 Useful Links

- **Vercel Docs**: https://vercel.com/docs
- **Vite Deployment**: https://vitejs.dev/guide/static-deploy.html#vercel
- **Railway Docs**: https://docs.railway.app
- **Render Docs**: https://render.com/docs

---

## 💡 Next Steps

1. ✅ **This moment**: Click "Deploy" on Vercel
2. **Wait 1-2 minutes** for build and deployment
3. **Visit your live URL** and test
4. **Optional**: Deploy backend for full email functionality
5. **Share**: Your site is live!

---

**Your GitHub Repo**: https://github.com/shlok2345788/matrix
**Ready to deploy? Go to Vercel Dashboard now!** 🎉
