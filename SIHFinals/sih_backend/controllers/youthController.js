import Youth from "../models/Youth.js";
import { uploadToCloudinary } from "../middleware/uploadMiddleware.js";

// SAVE FULL FORM (Step 1 → 5)
// SIMPLIFIED: No authentication required - uses mobile number only
export const saveYouthForm = async (req, res) => {
  try {
    const { mobile } = req.body;

    console.log("📝 Form submit received. Mobile:", mobile);

    if (!mobile) {
      return res.status(400).json({
        success: false,
        message: "Mobile number is required"
      });
    }

    // Find user by mobile
    const youth = await Youth.findOne({ mobile });
    if (!youth) {
      console.log("❌ No user found with mobile:", mobile);
      return res.status(404).json({
        success: false,
        message: "User not found with mobile: " + mobile + ". Please complete registration first."
      });
    }

    console.log("✅ Found user:", youth._id);

    // Extract all fields from body
    const updates = { ...req.body };
    delete updates.mobile; // Don't update mobile itself

    // Handle file uploads if present
    if (req.files?.aadhar) {
      const ad = await uploadToCloudinary(req.files.aadhar[0].buffer, "aadhar_docs");
      updates["documents.aadhar"] = { url: ad.secure_url, public_id: ad.public_id };
    }

    if (req.files?.photo) {
      const ph = await uploadToCloudinary(req.files.photo[0].buffer, "youth_photos");
      updates["documents.photo"] = { url: ph.secure_url, public_id: ph.public_id };
    }

    const updated = await Youth.findByIdAndUpdate(youth._id, updates, { new: true });

    console.log("✅ Form saved successfully for:", mobile);

    res.json({
      success: true,
      message: "Form saved successfully",
      data: updated
    });

  } catch (error) {
    console.error("❌ Form submission error:", error);
    res.status(500).json({
      success: false,
      message: "Form submission failed: " + error.message
    });
  }
};


// GET PROFILE
export const getYouthProfile = async (req, res) => {
  try {
    const youth = await Youth.findById(req.user._id).select("-password");
    res.json(youth);
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile" });
  }
};
