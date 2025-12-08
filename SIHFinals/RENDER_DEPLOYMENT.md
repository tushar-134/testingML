# 🚀 Quick Deployment Guide - Backend to Render

## Step-by-Step Instructions

### 1. Push Code to GitHub
```bash
cd c:\Users\ritik\SihWithModel\SIHFinals
git add .
git commit -m "Prepare backend for Render deployment"
git push origin main
```

### 2. Create Render Web Service

1. Go to https://render.com
2. Click **"New +" → "Web Service"**
3. Connect your GitHub repository
4. Select the repository: `SihWithModel`
5. Configure:
   - **Name**: `sih-backend`
   - **Root Directory**: `sih_backend` ← IMPORTANT!
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### 3. Add Environment Variables in Render

Click **"Environment"** tab and add these:

```
MONGO_URI = mongodb+srv://sih_user:K6dJmnBUcBs8_Y_@cluster0.yb1popv.mongodb.net/sih_database?retryWrites=true&w=majority

NODE_ENV = production

JWT_SECRET = <generate a secure random string - at least 32 characters>

ML_API_URL = <leave empty for now, add after ML API is deployed>

FRONTEND_URL = <leave empty for now, add after frontend is deployed>

FAST2SMS_API_KEY = bvpqR24N9yU0HlfdODESAMBx6C5izYFKnsuGtoW7jgIJQc8kw3VT2BGXZvckhOdIF1A0tH7WygMmPQLC
```

**To generate JWT_SECRET**:
```powershell
# In PowerShell:
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})
```

### 4. Configure MongoDB Atlas

1. Go to MongoDB Atlas → Database Access
2. Ensure user `sih_user` exists with correct password
3. Go to Network Access
4. Add IP Address: `0.0.0.0/0` (Allow from anywhere)
   - **Note**: For production, limit to Render's IPs

### 5. Deploy!

1. Click **"Create Web Service"**
2. Wait for deployment (5-10 minutes)
3. Once deployed, you'll get a URL like: `https://sih-backend.onrender.com`

### 6. Test Deployment

Open browser or use curl:
```bash
curl https://sih-backend.onrender.com/
```

Expected: `"Youth Registration Backend Running 🚀"`

Check logs in Render dashboard for:
```
MongoDB Connected: ac-sg6vmoy-shard-00-00.yb1popv.mongodb.net
Server running on port 10000
```

### 7. Update Environment Variables

Once you have the backend URL:

**ML API Integration**:
- Deploy ML API separately (or skip if not ready)
- Add `ML_API_URL` in Render environment variables
- Restart service

**Frontend** (after frontend deployment):
- Add `FRONTEND_URL=https://your-frontend.onrender.com`
- Restart service

---

## Common Issues & Fixes

### ❌ "MongoDB connection error"
✅ Check MongoDB Atlas Network Access allows `0.0.0.0/0`  
✅ Verify `MONGO_URI` is correct in Render environment variables

### ❌ "Service won't start"
✅ Check **Logs** tab in Render dashboard  
✅ Ensure `Root Directory` is set to `sih_backend`  
✅ Verify all required dependencies are in `package.json`

### ❌ "CORS error from frontend"
✅ Add frontend URL to `FRONTEND_URL` environment variable  
✅ Restart service after adding

---

## Next Steps After Backend Deploy

1. ✅ Backend deployed and accessible
2. ⬜ Deploy ML API (Python) to Render (separate service)
3. ⬜ Deploy Frontend to Render/Vercel
4. ⬜ Update frontend with backend URL
5. ⬜ Test complete flow: Register → Form → Recommendations

---

## Important URLs

- **Backend**: `https://sih-backend.onrender.com` (example)
- **Backend Dashboard**: https://dashboard.render.com
- **MongoDB Atlas**: https://cloud.mongodb.com

---

## Production Notes

⚠️ **Free Tier Limitations**:
- Service spins down after 15 mins of inactivity
- First request after idle = 30-60s cold start
- Upgrade to paid tier for always-on

✅ **Security**:
- JWT_SECRET must be random and secure
- Never commit `.env` file
- Use Render's secret environment variables

---

**Ready to deploy? Follow the steps above and your backend will be live!** 🚀
