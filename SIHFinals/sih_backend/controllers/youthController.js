import Youth from "../models/Youth.js";
import { uploadToCloudinary } from "../middleware/uploadMiddleware.js";

// SAVE FULL FORM (Step 1 → 5)
export const saveYouthForm = async (req, res) => {
  try {
    const youthId = req.user._id;

    const {
      fullname,
      fathername,
      dob,
      gender,
      email,

      permAddress,
      permState,
      permDistrict,
      permPincode,

      corrAddress,
      corrState,
      corrDistrict,
      corrPincode,

      qualification,
      university,
      passingYear,
      grade,

      skills,
      experienceList,
    } = req.body;

    const updates = {
      fullname,
      fathername,
      dob,
      gender,
      email,

      permAddress,
      permState,
      permDistrict,
      permPincode,

      corrAddress,
      corrState,
      corrDistrict,
      corrPincode,

      qualification,
      university,
      passingYear,
      grade,
      skills,
      experienceList,
    };

    // Upload Aadhar
    if (req.files?.aadhar) {
      const ad = await uploadToCloudinary(req.files.aadhar[0].buffer, "aadhar_docs");
      updates["documents.aadhar"] = { url: ad.secure_url, public_id: ad.public_id };
    }

    // Upload photo
    if (req.files?.photo) {
      const ph = await uploadToCloudinary(req.files.photo[0].buffer, "youth_photos");
      updates["documents.photo"] = { url: ph.secure_url, public_id: ph.public_id };
    }

    const updated = await Youth.findByIdAndUpdate(youthId, updates, { new: true });

    res.json({ message: "Form saved successfully", data: updated });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Form submission failed" });
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
