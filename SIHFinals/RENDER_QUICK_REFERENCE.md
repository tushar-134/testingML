# ⚡ RENDER DEPLOYMENT - QUICK REFERENCE

**Repository**: `tushar-134/testingML`  
**Your JWT Secret**: (generated below)

---

## 📋 Configuration Checklist

When you're on the Render setup page, copy these exact values:

### Service Configuration
```
Name: sih-backend
Region: Singapore
Branch: main
Root Directory: SIHFinals/sih_backend
Environment: Node
Build Command: npm install
Start Command: npm start
Plan: Free
```

### Environment Variables (Click "Advanced" → Add each one)

```env
MONGO_URI=mongodb+srv://sih_user:K6dJmnBUcBs8_Y_@cluster0.yb1popv.mongodb.net/sih_database?retryWrites=true&w=majority

NODE_ENV=production

PORT=10000

JWT_SECRET=YOUR_GENERATED_SECRET_BELOW

CLOUD_NAME=dsf0yp2hr

CLOUD_API_KEY=563713949862699

CLOUD_API_SECRET=d_HSX5dQCyDnZaCWltF0SNyDVwk
```

---

## 🎯 Step-by-Step (While on Render Page)

1. **Connect Repository**
   - Find and click: `tushar-134/testingML`
   - Click "Connect"

2. **Configure Service**
   - Copy settings from "Service Configuration" above
   - ⚠️ **CRITICAL**: Root Directory must be `SIHFinals/sih_backend`

3. **Add Environment Variables**
   - Click "Advanced" button
   - Click "Add Environment Variable" for each one
   - Copy paste from "Environment Variables" section above

4. **Create Service**
   - Scroll to bottom
   - Click "Create Web Service"
   - Wait 5-10 minutes for deployment

5. **Check Logs**
   - Once created, click "Logs" tab
   - Look for: "MongoDB Connected" and "Server running on port 10000"

6. **Get Your URL**
   - Copy the URL (e.g., `https://sih-backend.onrender.com`)
   - Test it: Should show "Youth Registration Backend Running 🚀"

---

## ✅ Success Indicators

- Status shows "Live" (green dot)
- Logs show "MongoDB Connected"
- Logs show "Server running on port 10000"
- URL works in browser

---

**The browser should have opened to Render. Follow the steps above!** 🚀
