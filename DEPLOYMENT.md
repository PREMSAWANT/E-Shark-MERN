# 🚀 Vercel Deployment Guide

## Automatic Deployment Setup

Vercel is configured to automatically deploy whenever you push to GitHub.

---

## 📋 Deployment Steps

### 1. Frontend Deployment (Vercel)

**First Time Setup:**

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import `E-Shark-MERN` repository
5. Configure:
   - **Framework Preset:** Create React App
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`

6. **Environment Variables:**
   Add in Vercel dashboard:
   ```
   REACT_APP_API_URL=https://your-backend-url.com/api
   ```

7. Click "Deploy"

**After Git Push:**
- Vercel automatically detects changes
- Builds and deploys within 1-2 minutes
- Check deployment at: `https://e-shark.vercel.app` (or your custom domain)

---

### 2. Backend Deployment (Render/Railway)

**Option A: Render.com**

1. Go to [render.com](https://render.com)
2. Sign up/Login
3. Click "New" → "Web Service"
4. Connect GitHub repository
5. Configure:
   - **Name:** e-shark-api
   - **Root Directory:** `backend`
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free

6. **Environment Variables:**
   ```
   NODE_ENV=production
   MONGODB_URI=<your-mongodb-atlas-uri>
   JWT_SECRET=<strong-random-secret-key>
   JWT_EXPIRE=7d
   FRONTEND_URL=https://your-vercel-url.vercel.app
   PORT=5000
   ```

7. Click "Create Web Service"

**Option B: Railway.app**

1. Go to [railway.app](https://railway.app)
2. Click "Start a New Project"
3. Select "Deploy from GitHub repo"
4. Choose `E-Shark-MERN`
5. Add environment variables (same as above)
6. Deploy automatically starts

---

### 3. Database (MongoDB Atlas)

1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create free cluster (M0)
3. Create database user with password
4. Network Access → Add IP: `0.0.0.0/0` (allow all)
5. Get connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/e-shark?retryWrites=true&w=majority
   ```
6. Update `MONGODB_URI` in backend environment variables

---

## 🔄 Automatic Deployment Workflow

```
1. Make code changes locally
2. git add .
3. git commit -m "Your message"
4. git push origin main
   ↓
5. GitHub receives push
   ↓
6. Vercel auto-deploys frontend (1-2 min)
7. Render/Railway auto-deploys backend (2-3 min)
   ↓
8. Live site updated! 🎉
```

---

## 🧪 Testing Deployment

After deployment:

1. **Check Frontend:**
   - Visit your Vercel URL
   - Test registration/login
   - Ensure all pages load

2. **Check Backend:**
   - Visit `https://your-backend-url.com/api/health`
   - Should return: `{ "success": true, "message": "E-Shark API is running" }`

3. **Check Database:**
   - Register a new user
   - Should save to MongoDB Atlas
   - Check in Atlas dashboard → Collections

---

## 🔧 Common Issues & Fixes

### Frontend Shows "Can't connect to server"
**Fix:** Update `REACT_APP_API_URL` in Vercel environment variables

### Backend Crashes on Startup
**Fix:** Check MongoDB connection string and JWT_SECRET are set correctly

### CORS Errors
**Fix:** Ensure `FRONTEND_URL` in backend ENV matches your Vercel URL exactly

### Build Fails
**Fix:** 
- Clear build cache in Vercel/Render
- Check `package.json` dependencies
- Review build logs for specific errors

---

## 📊 Monitoring Deployments

**Vercel Dashboard:**
- View deployment history
- Check build logs
- Monitor analytics

**Render/Railway Dashboard:**
- Check service health
- View logs
- Monitor resource usage

---

## 🔐 Security Checklist

Before going live:

- [ ] Change JWT_SECRET to strong random string
- [ ] Update MongoDB password
- [ ] Restrict MongoDB IP whitelist (if possible)
- [ ] Enable CORS only for your frontend URL
- [ ] Review all environment variables
- [ ] Test authentication flows
- [ ] Enable rate limiting

---

## 🎯 Custom Domain (Optional)

**Vercel:**
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. SSL automatically configured

**Backend:**
1. Use Render/Railway custom domain feature
2. Or use Cloudflare as reverse proxy

---

## 📝 Deployment Checklist

Frontend (Vercel):
- [x] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Environment variables set
- [ ] Deployment successful
- [ ] Frontend accessible

Backend (Render/Railway):
- [ ] Service created
- [ ] Environment variables set
- [ ] MongoDB connection working
- [ ] Deployment successful
- [ ] API responding

Database (MongoDB Atlas):
- [ ] Cluster created
- [ ] User created
- [ ] IP whitelisted
- [ ] Connection string copied
- [ ] Backend connected

Final:
- [ ] Register test user
- [ ] Create test pitch
- [ ] Test real-time chat
- [ ] Admin panel accessible
- [ ] All pages working

---

## 🚨 Emergency Rollback

If deployment breaks:

**Vercel:**
1. Go to Deployments
2. Find previous working deployment
3. Click "Promote to Production"

**Render/Railway:**
1. Use "Rollback" feature
2. Or redeploy from specific commit

---

## 📞 Support

**Vercel:** [vercel.com/docs](https://vercel.com/docs)
**Render:** [render.com/docs](https://render.com/docs)
**MongoDB Atlas:** [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)

---

**Your platform will now auto-deploy on every push! 🚀**
