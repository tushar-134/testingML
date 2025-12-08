# 🚀 Deploy Backend to Render - Simple Manual Steps

**Repository**: `tushar-134/testingML`  
**Your JWT Secret**: `cBjCrnK43UDZPxHS1kflNaopJETz6L8M`

---

## Step 1: Open Render & Create Web Service

1. Go to: https://dashboard.render.com
2. Click **"New +"** (top right)
3. Select **"Web Service"**

---

## Step 2: Connect Your GitHub Repository

1. Click **"Build and deploy from a Git repository"**
2. Find and click: **`tushar-134/testingML`**
3. Click **"Connect"**

---

## Step 3: Configure Service (Copy These Exactly)

| Setting | Value |
|---------|-------|
| **Name** | `sih-backend` |
| **Region** | `Singapore` |
| **Branch** | `main` |
| **Root Directory** | `SIHFinals/sih_backend` |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Instance Type** | `Free` |

---

## Step 4: Add Environment Variables

Click **"Advanced"** button, then click **"Add Environment Variable"** for each:

### Add These One by One:

**1. MONGO_URI**
```
mongodb+srv://sih_user:K6dJmnBUcBs8_Y_@cluster0.yb1popv.mongodb.net/sih_database?retryWrites=true&w=majority
```

**2. NODE_ENV**
```
production
```

**3. PORT**
```
10000
```

**4. JWT_SECRET**
```
cBjCrnK43UDZPxHS1kflNaopJETz6L8M
```

**5. CLOUD_NAME**
```
dsf0yp2hr
```

**6. CLOUD_API_KEY**
```
563713949862699
```

**7. CLOUD_API_SECRET**
```
d_HSX5dQCyDnZaCWltF0SNyDVwk
```

---

## Step 5: Create Web Service

1. Scroll to bottom
2. Click **"Create Web Service"** button
3. Wait 5-10 minutes for deployment

---

## Step 6: Verify Deployment

### Check Logs:
- Click **"Logs"** tab
- Look for: `MongoDB Connected: ac-sg6vmoy-shard-00-00.yb1popv.mongodb.net`
- Look for: `Server running on port 10000`

### Test Backend:
- Copy your backend URL (e.g., `https://sih-backend.onrender.com`)
- Open in browser
- Should show: **"Youth Registration Backend Running 🚀"**

---

## Step 7: Configure MongoDB Atlas (If Connection Fails)

1. Go to: https://cloud.mongodb.com
2. Click **"Network Access"** (left sidebar)
3. Click **"Add IP Address"**
4. Enter: `0.0.0.0/0` (Allow from anywhere)
5. Click **"Confirm"**
6. Wait 1-2 minutes
7. Go back to Render and click **"Manual Deploy"** → **"Deploy latest commit"**

---

## ✅ Success Indicators

- ✅ Status shows **"Live"** (green)
- ✅ Logs show "MongoDB Connected"
- ✅ Logs show "Server running on port 10000"
- ✅ URL works in browser

---

## 📝 After Deployment

Save your backend URL! You'll need it for:
- Frontend configuration
- ML API integration

Example URL: `https://sih-backend.onrender.com`

---

**That's it! Follow these steps and your backend will be deployed!** 🎉
