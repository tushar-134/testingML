# 🧪 Complete System Test Guide

## Test Your Local Setup

### ✅ Services Status

Run these commands to verify all services are running:

```powershell
# Backend (Port 5000)
curl http://localhost:5000/
# Expected: "Youth Registration Backend Running 🚀"

# ML API (Port 5001)
curl http://localhost:5001/health
# Expected: {"status":"healthy","jobs_loaded":761,...}

# Frontend (Port 3001)
# Open in browser: http://localhost:3001
```

---

## 🎯 Complete User Flow Test

### 1. Registration Flow

1. **Open Frontend**: http://localhost:3001
2. **Click "Sign Up" or "Register"**
3. **Enter Mobile**: `9876543210`
4. **Click "Send OTP"**
5. **Check Backend Console** for OTP:
   ```
   🔐 OTP for +919876543210: 123456
   ```
6. **Enter OTP** and click "Verify"
7. **Set Password**: `Test@123`
8. **Success!** Token is automatically saved

### 2. Youth Profile Form

After password creation, you should be redirected automatically:

1. **Fill Personal Info** (Step 1)
2. **Fill Address** (Step 2)
3. **Fill Education** (Step 3)
4. **Fill Skills** (Step 4)
5. **Upload Documents** (Step 5)
6. **Review & Submit** (Step 6)

**Expected**: Form submits successfully (no 401 error!)

### 3. ML Job Recommendations

After form submission:

1. **Automatically redirected** to `/recommendations`
2. **See AI-matched jobs** from ML model
3. **Check match scores** for each job

---

## 🔍 Test Individual Components

### Test Backend API Endpoints

```powershell
# Health check
curl http://localhost:5000/

# Send OTP (without SMS in dev mode)
curl -X POST http://localhost:5000/api/auth/send-otp `
  -H "Content-Type: application/json" `
  -d '{"mobile":"9876543210"}'

# Create password
curl -X POST http://localhost:5000/api/auth/create-password `
  -H "Content-Type: application/json" `
  -d '{"mobile":"9876543210","password":"Test@123"}'
```

### Test ML API

```powershell
# Health check
curl http://localhost:5001/health

# Test job matching
curl -X POST http://localhost:5001/match-jobs `
  -H "Content-Type: application/json" `
  -d '{\"position\":\"Software Engineer\",\"skills\":\"Python, JavaScript\",\"qualification\":\"Bachelor\"}'
```

---

## ✅ Success Indicators

### Backend ✓
- [x] Returns "Youth Registration Backend Running 🚀"
- [x] MongoDB connected message in console
- [x] No errors in console

### ML API ✓
- [x] Returns `{"status":"healthy","jobs_loaded":761}`
- [x] Model loaded: `tazarov/all-minilm-l6-v2-f32:latest`
- [x] No errors in console

### Frontend ✓
- [x] Compiles without errors
- [x] Loads at http://localhost:3001
- [x] No CORS errors in browser console

### Complete Flow ✓
- [x] Registration works (mobile → OTP → password)
- [x] Form submission works (no 401 error)
- [x] Redirect to recommendations works
- [x] ML jobs display correctly

---

## 🐛 Common Issues & Fixes

### Issue: 401 Error on Form Submit
**Fix**: Make sure you completed registration and password creation first. The token is automatically saved.

### Issue: CORS Error
**Fix**: All CORS issues should be fixed with proxy. If you see any, refresh the browser.

### Issue: ML API Returns No Jobs
**Fix**: Check ML API console - should show "761 jobs loaded". If not, restart ML API.

### Issue: OTP Not Showing
**Fix**: Check backend console output. In development mode, OTP is logged there, not sent via SMS.

---

## 📊 Expected Results

### Registration Flow
```
Mobile Entry → OTP in Console → Password Set → Token Saved ✅
```

### Form Submission
```
Fill Form → Submit → Success Message → Redirect ✅
```

### ML Recommendations
```
Backend Fetches Profile → Calls ML API → Returns Top 20 Jobs → Displayed ✅
```

---

## 🎉 Test Complete When:

1. ✅ Can register a new user
2. ✅ Can set password
3. ✅ Can fill and submit youth form
4. ✅ Can see ML job recommendations
5. ✅ No errors in any console (browser, backend, ML)

---

**Open http://localhost:3001 and test the complete flow now!** 🚀
