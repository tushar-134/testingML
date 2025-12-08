import jwt from "jsonwebtoken";
import Youth from "../models/Youth.js";
import Admin from "../models/Admin.js";

export const protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (!token)
    return res.status(401).json({ message: "Not authorized (No Token)" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role === "youth") {
      req.user = await Youth.findById(decoded.id).select("-password");
    } else {
      req.user = await Admin.findById(decoded.id).select("-password");
    }

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid Token" });
  }
};
