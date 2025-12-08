// import axios from "axios";
// import User from "../models/Youth.js";


// // Generate OTP
// const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// // SEND OTP
// export const sendOtp = async (req, res) => {
//   const { mobile } = req.body;

//   if (!mobile)
//     return res.status(400).json({ success: false, message: "Mobile required" });

//   try {
//     const otp = generateOtp();

//     let user = await User.findOne({ mobile });

//     if (!user) {
//       user = await User.create({ mobile });
//     }

//     user.otp = otp;
//     user.otpExpires = Date.now() + 5 * 60 * 1000;
//     await user.save();

//     // FAST2SMS MESSAGE
//     const message = `Your OTP for PM Internship Portal is ${otp}. Do not share it with anyone.`;

//     await axios.post(
//       "https://www.fast2sms.com/dev/bulkV2",
//       {
//         route: "v3",
//         sender_id: "TXTIND",
//         message,
//         language: "english",
//         numbers: mobile
//       },
//       {
//         headers: {
//           authorization: process.env.FAST2SMS_API_KEY,
//         }
//       }
//     );

//     console.log("OTP sent:", otp);

//     res.json({
//       success: true,
//       message: "OTP sent successfully"
//     });

//   } catch (err) {
//     console.error("SMS Error:", err);
//     res.status(500).json({
//       success: false,
//       message: "Failed to send OTP"
//     });
//   }
// };


// // VERIFY OTP
// export const verifyOtp = async (req, res) => {
//   const { mobile, otp } = req.body;

//   if (!mobile || !otp)
//     return res.status(400).json({ success: false, message: "Mobile and OTP required" });

//   try {
//     const user = await User.findOne({ mobile });

//     if (!user)
//       return res.status(400).json({ success: false, message: "User not found" });

//     if (user.otp !== otp)
//       return res.status(400).json({ success: false, message: "Invalid OTP" });

//     if (Date.now() > user.otpExpires)
//       return res.status(400).json({ success: false, message: "OTP expired" });

//     // Clear OTP after verification
//     user.otp = null;
//     user.otpExpires = null;
//     await user.save();

//     res.json({
//       success: true,
//       message: "OTP verified successfully"
//     });

//   } catch (err) {
//     console.error("OTP verify error:", err);
//     res.status(500).json({
//       success: false,
//       message: "Failed to verify OTP"
//     });
//   }
// };

import axios from "axios";
import Youth from "../models/Youth.js";

// Generate OTP
const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// SEND OTP
export const sendOtp = async (req, res) => {
  const { mobile } = req.body;

  if (!mobile)
    return res.status(400).json({ success: false, message: "Mobile required" });

  try {
    const otp = generateOtp();

    let user = await Youth.findOne({ mobile });

    if (!user) {
      user = await Youth.create({ mobile });
    }

    user.otp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000; // 5 minutes
    await user.save();

    // ✅ ALWAYS log OTP for development/testing
    console.log(`\n🔐 OTP for ${mobile}: ${otp}\n`);

    // Try to send SMS if API key is configured
    const apiKey = process.env.FAST2SMS_API_KEY;

    if (apiKey && apiKey !== "EeXdcKYn0kQTVVNAcxDOM0nuAHnZ0Eu6D1Til3HbNOpikHbIpSTYupzHmvIc") {
      try {
        const message = `Your OTP for PM Internship Portal is ${otp}. Do not share it with anyone.`;

        await axios.post(
          "https://www.fast2sms.com/dev/bulkV2",
          {
            route: "v3",
            sender_id: "TXTIND",
            message,
            language: "english",
            numbers: mobile,
          },
          {
            headers: {
              authorization: apiKey,
            },
          }
        );

        console.log("✅ SMS sent successfully via FAST2SMS");
      } catch (smsError) {
        // Log SMS error but don't fail the request
        console.error("⚠️ SMS sending failed:", smsError.response?.data || smsError.message);
        console.log("📝 OTP saved to database. Use OTP from console for testing.");
      }
    } else {
      console.log("📝 FAST2SMS_API_KEY not configured. OTP saved to database only.");
    }

    // ✅ Always return success if OTP is saved to database
    // Only include the OTP in the API response when not in production
    const responsePayload = {
      success: true,
      message: "OTP sent successfully",
    };

    if (process.env.NODE_ENV !== "production") {
      // For local development/testing include OTP in response (convenience)
      responsePayload.otp = otp;
    }

    res.json(responsePayload);

  } catch (err) {
    console.error("❌ Error in sendOtp:", err);
    res.status(500).json({
      success: false,
      message: "Failed to send OTP",
    });
  }
};


// VERIFY OTP
export const verifyOtp = async (req, res) => {
  const { mobile, otp } = req.body;

  console.log(`\n🔍 Verifying OTP for ${mobile}. Received: ${otp}`);

  if (!mobile || !otp)
    return res
      .status(400)
      .json({ success: false, message: "Mobile and OTP required" });

  try {
    const user = await Youth.findOne({ mobile });

    if (!user) {
      console.log("❌ User not found");
      return res.status(400).json({ success: false, message: "User not found" });
    }

    console.log(`   Stored OTP: ${user.otp}`);
    console.log(`   Expires at: ${new Date(user.otpExpires).toLocaleString()}`);

    if (user.otp !== otp) {
      console.log("❌ Invalid OTP");
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (Date.now() > user.otpExpires) {
      console.log("❌ OTP expired");
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    // Clear OTP after verification
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    console.log("✅ OTP Verified Successfully");

    res.json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (err) {
    console.error("❌ OTP verify error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to verify OTP",
    });
  }
};
