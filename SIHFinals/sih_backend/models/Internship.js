// const mongoose = require("mongoose");

// const internshipSchema = new mongoose.Schema({
//   title: String,
//   company: String,
//   location: String,
//   requiredSkills: [String],
//   description: String,
//   duration: String,
//   category: String,
// });

// module.exports = mongoose.model("Internship", internshipSchema);


import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  requiredSkills: [String],
  description: String,
  duration: String,
  category: String,
});

// Export default for ESM compatibility
export default mongoose.model("Internship", internshipSchema);
