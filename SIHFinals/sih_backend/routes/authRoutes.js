// import { youthSignup, youthLogin, adminLogin } from "../controllers/authController.js";
// import express from "express";
// import { createPassword } from "../controllers/authController.js";
// import { sendOtp, verifyOtp } from "../controllers/otpController.js";


// const router = express.Router();

// // Youth login/signup
// router.post("/youth/signup", youthSignup);
// router.post("/youth/login", youthLogin);

// // Admin
// router.post("/admin/login", adminLogin);

// // OTP
// router.post("/send-otp", sendOtp);
// router.post("/verify-otp", verifyOtp);

// // Password Creation
// router.post("/create-password", createPassword);

// // Login
// router.post("/youth/login", youthLogin);
// router.post("/admin/login", adminLogin);

// export default router;

import express from "express";
import {
  youthSignup,
  youthLogin,
  adminLogin,
  createPassword,
} from "../controllers/authController.js";

import { sendOtp, verifyOtp } from "../controllers/otpController.js";
import Youth from "../models/Youth.js"; // ADDED: For dev bypass endpoint

const router = express.Router();

// ADDED: Development bypass - auto-verify any mobile number (REMOVE IN PRODUCTION!)
if (process.env.NODE_ENV !== 'production') {
  router.post("/dev-bypass", async (req, res) => {
    const { mobile } = req.body;
    if (!mobile) {
      return res.status(400).json({ success: false, message: "Mobile required" });
    }

    try {
      let user = await Youth.findOne({ mobile });
      if (!user) {
        user = await Youth.create({ mobile });
      }

      console.log(`🔓 DEV BYPASS: Auto-verified ${mobile}`);

      res.json({
        success: true,
        message: "Development bypass - OTP auto-verified",
        otp: "123456" // Fake OTP for display
      });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  });
}

// OTP
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

// Create Password
router.post("/create-password", createPassword);

// Youth login
router.post("/youth/login", youthLogin);

// Youth signup
router.post("/youth/signup", youthSignup);

// Admin login
router.post("/admin/login", adminLogin);

export default router;
