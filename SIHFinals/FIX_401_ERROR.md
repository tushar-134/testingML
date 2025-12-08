# 401 Unauthorized Error - Quick Fix

## Problem
The `/api/youth/submit` endpoint requires authentication (JWT token), but the token isn't being passed correctly.

## ROOT CAUSE
After registration, you need to **LOGIN** to get a valid token before you can submit the form.

## Quick Solution

### Option 1: Login First (Recommended)
1. Complete registration (mobile → OTP → password)
2. **Go to login page**: http://localhost:3001/login
3. Login with your mobile + password
4. This will save a valid token to localStorage
5. Then fill and submit the youth form

### Option 2: Check Token in Browser Console
Press **F12** and go to **Console**, then type:
```javascript
localStorage.getItem("token")
```

**If it shows `null`**:
- You haven't logged in yet
- Go to login page and login first

**If it shows a token** (long string starting with "eyJ..."):
- Token exists but might be invalid/expired
- Try login again

## Why This Happens

The youth form submission endpoint  (`/api/youth/submit`) has the `protect` middleware which requires:
1. Valid JWT token in Authorization header
2. Token must be from a logged-in user

**Registration flow** (`/api/auth/create-password`):
- Creates account
- May or may not return a token (depends on backend implementation)

**Login flow** (`/api/auth/youth/login`):
- Validates credentials
- **Always returns a valid token**
- Saves to localStorage as "token"

## To Fix Properly

**Test this flow**:
1. Register → Set Password
2. **Login** at http://localhost:3001/login  
3. Fill youth form
4. Submit → Should work now!

If you still get 401 after login, check the backend terminal for error messages.
