// import mongoose from "mongoose";

// const youthSchema = new mongoose.Schema({
//   fullname: String,
//   fathername: String,
//   dob: String,
//   gender: String,
//   email: { type: String, unique: true },
//   mobile: { type: String, unique: true },
//   password: String,

//   // Address
//   permAddress: String,
//   permState: String,
//   permDistrict: String,
//   permPincode: String,

//   corrAddress: String,
//   corrState: String,
//   corrDistrict: String,
//   corrPincode: String,

//   // Education
//   qualification: String,
//   university: String,
//   passingYear: String,
//   grade: String,

//   // Skills
//   skills: [String],

//   // Documents
//   documents: {
//     aadhar: { url: String, public_id: String },
//     photo: { url: String, public_id: String }
//   },

//   // Work Experience
//   experienceList: [
//     {
//       company: String,
//       role: String,
//       duration: String,
//       description: String,
//     },
//   ],
// });

// export default mongoose.model("Youth", youthSchema);


import mongoose from "mongoose";

const youthSchema = new mongoose.Schema({
  fullname: String,
  fathername: String,
  dob: String,
  gender: String,
  email: { type: String, unique: false },
  mobile: { type: String, unique: true },
  password: String,

  // OTP fields
  otp: { type: String, default: null },
  otpExpires: { type: Number, default: null },

  // Address
  permAddress: String,
  permState: String,
  permDistrict: String,
  permPincode: String,

  corrAddress: String,
  corrState: String,
  corrDistrict: String,
  corrPincode: String,

  // Education
  qualification: String,
  university: String,
  passingYear: String,
  grade: String,

  // Skills
  skills: [String],

  // Documents
  documents: {
    aadhar: { url: String, public_id: String },
    photo: { url: String, public_id: String },
  },

  // Work Experience
  experienceList: [
    {
      company: String,
      role: String,
      duration: String,
      description: String,
    },
  ],
});

export default mongoose.model("Youth", youthSchema);
