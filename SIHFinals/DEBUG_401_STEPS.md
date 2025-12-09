# 🔍 Debug 401 Error - Step by Step

## Step 1: Open Browser Console

1. Go to http://localhost:3001
2. Press **F12** to open DevTools
3. Go to **Console** tab

## Step 2: Check localStorage

Run this in console:
```javascript
console.log("Token:", localStorage.getItem("token"));
console.log("Mobile:", localStorage.getItem("otp_mobile"));
```

**Expected**:
- Token: Should show a long string starting with "eyJ..."
- Mobile: Should show your phone number (e.g., "9876543210")

**If Token is `null`**: You haven't completed registration/password setup. Do that first.

## Step 3: Copy and Run Test Script

Copy the entire content of `TEST_FORM_SUBMIT.js` and paste into browser console.

**What it does**:
- Tests the submit endpoint directly
- Shows which header is sent
- Displays the exact error from server

## Step 4: Check Backend Terminal

After running the test, check your backend terminal (`cd sih_backend; node server.js`).

Should see logs like:
```
=== YOUTH FORM SUBMIT ===
Headers: {...}
Authorization header: Bearer eyJ...
```

## Step 5: Interpret Results

### If you see "No mobile provided":
- Mobile isn't being sent
- **Fix**: Complete OTP flow first OR hardcode mobile in form

### If you see "User not found":
- No user exists with that mobile number
- **Fix**: Complete registration for that mobile first

### If you see "Invalid Token" or "Not authorized":
- Token is wrong or expired
- **Fix**: Login again OR complete password creation

### If backend logs don't appear at all:
- Request isn't reaching the endpoint
- **Fix**: Check CORS, check URL, check if backend is running

## Step 6: Quick Fixes

### Fix #1: Clear everything and start fresh
```javascript
localStorage.clear();
// Then do: Register → OTP → Password → Form
```

### Fix #2: Set mobile manually (temporary)
```javascript
localStorage.setItem("otp_mobile", "9876543210"); // Your actual number
```

### Fix #3: Test if backend accepts requests without auth
```powershell
curl -X POST http://localhost:5000/api/youth/submit `
  -H "Content-Type: application/json" `
  -d '{\"mobile\":\"9876543210\",\"fullname\":\"Test\"}'
```

If this returns 200 OK, the backend is fine - it's a frontend issue.
If this returns 401, there's still auth middleware somewhere.

---

**Run these steps and tell me what you see!** 🔍
