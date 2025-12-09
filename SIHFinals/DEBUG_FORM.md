# Quick Debug - Test Form Submission

Open browser console (F12) and run this:

```javascript
// Test if mobile is in localStorage
console.log("Mobile:", localStorage.getItem("otp_mobile"));

// Test form submission with mobile
fetch('/api/youth/submit', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    mobile: '9876543210',  // Replace with your actual mobile
    fullname: 'Test User'
  })
}).then(r => r.json()).then(data => console.log(data));
```

This tests if the backend accepts requests without authentication.

If this works, then the issue is with how the frontend is sending the request.
If this fails with 401, there's still something checking authentication.
