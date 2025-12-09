// Quick test script - Run this in browser console

// Step 1: Check localStorage
console.log("Token:", localStorage.getItem("token"));
console.log("Mobile:", localStorage.getItem("otp_mobile"));

// Step 2: Test backend endpoint directly
async function testSubmit() {
    const token = localStorage.getItem("token");
    const mobile = localStorage.getItem("otp_mobile") || "9876543210"; // fallback

    try {
        const response = await fetch('/api/youth/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            },
            body: JSON.stringify({
                mobile: mobile,
                fullname: "Test User",
                email: "test@example.com"
            })
        });

        const data = await response.json();
        console.log("Status:", response.status);
        console.log("Response:", data);

        if (response.status === 401) {
            console.error("401 Unauthorized - Check:");
            console.error("1. Is token set?", !!token);
            console.error("2. Is mobile correct?", mobile);
            console.error("3. Server message:", data.message);
        }
    } catch (err) {
        console.error("Request failed:", err);
    }
}

// Run the test
testSubmit();
