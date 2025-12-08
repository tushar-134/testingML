import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { saveYouthForm, getYouthProfile } from "../controllers/youthController.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/profile", protect, getYouthProfile);

router.post(
  "/submit",
  // MODIFIED: Removed protect middleware to allow form submission during registration flow
  // Users can submit profile immediately after registration without separate login
  upload.fields([
    { name: "aadhar", maxCount: 1 },
    { name: "photo", maxCount: 1 },
  ]),
  saveYouthForm
);

export default router;
