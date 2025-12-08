import bcrypt from "bcryptjs";
import Youth from "../models/Youth.js";
import Admin from "../models/Admin.js";
import { generateToken } from "../utils/generateToken.js";

// YOUTH SIGNUP (mobile + password)
export const youthSignup = async (req, res) => {
  try {
    const { mobile, password } = req.body;

    // check duplicate
    const exists = await Youth.findOne({ mobile });
    if (exists) return res.status(400).json({ message: "Mobile already registered" });

    const hashed = await bcrypt.hash(password, 10);

    const youth = await Youth.create({
      mobile,
      password: hashed,
    });

    res.json({
      message: "Youth registered successfully",
      token: generateToken(youth._id, "youth"),
      youthId: youth._id
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};


export const createPassword = async (req, res) => {
  try {
    const { mobile, password } = req.body;

    console.log(`\n🔐 Creating password for mobile: ${mobile}`);
    console.log(`   Password length: ${password?.length}`);

    const youth = await Youth.findOne({ mobile });

    if (!youth) {
      console.log(`❌ User not found for mobile: ${mobile}`);
      return res.status(400).json({ message: "User not found" });
    }

    console.log(`✅ User found: ${youth._id}`);

    youth.password = await bcrypt.hash(password, 10);
    await youth.save();

    console.log(`✅ Password created successfully for ${mobile}`);

    res.json({
      message: "Password created successfully",
      token: generateToken(youth._id, "youth"),
      youthId: youth._id
    });

  } catch (err) {
    console.error(`❌ Error in createPassword:`, err);
    res.status(500).json({ message: "Server error" });
  }
};

// YOUTH LOGIN
export const youthLogin = async (req, res) => {
  try {
    const { mobile, password } = req.body;

    const youth = await Youth.findOne({ mobile });
    if (!youth) return res.status(400).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, youth.password);
    if (!valid) return res.status(400).json({ message: "Invalid password" });

    res.json({
      message: "Login successful",
      token: generateToken(youth._id, "youth"),
      youthId: youth._id,
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


// ADMIN LOGIN
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: "Admin not found" });

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) return res.status(400).json({ message: "Invalid password" });

    res.json({
      message: "Admin logged in",
      token: generateToken(admin._id, "admin"),
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
