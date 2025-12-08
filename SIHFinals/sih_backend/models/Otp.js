import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  mobile: String,
  otp: String,
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300 // auto delete after 5 minutes
  }
});

export default mongoose.model("Otp", otpSchema);
