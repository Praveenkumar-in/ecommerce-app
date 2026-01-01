

import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import adminModel from "../models/adminModel.js";

const createToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

// User: Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.json({ success:false, message:"Email and password required" });

    const user = await userModel.findOne({ email });
    if (!user) return res.json({ success:false, message:"User not found" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.json({ success:false, message:"Invalid credentials" });

    const token = createToken({ id: user._id, role: "user" });
    res.json({ success:true, token });
  } catch (err) {
    res.json({ success:false, message: err.message });
  }
};

// User: Register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password)
      return res.json({ success:false, message:"All fields required" });

    const exists = await userModel.findOne({ email });
    if (exists) return res.json({ success:false, message:"User already exists" });

    if (!validator.isEmail(email))
      return res.json({ success:false, message:"Please enter a valid email" });

    if (password.length < 8)
      return res.json({ success:false, message:"Please enter a strong password" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userModel.create({ name, email, password: hashedPassword });
    const token = createToken({ id: user._id, role: "user" });
    res.json({ success:true, token });
  } catch (err) {
    res.json({ success:false, message: err.message });
  }
};

// ---------- ADMIN: LOGIN ----------
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // If you store admins in a separate collection:
    const admin = await adminModel.findOne({ email });
    if (!admin) return res.status(404).json({ success: false, message: "Admin not found" });

    const ok = await bcrypt.compare(password, admin.password);
    if (!ok) return res.status(400).json({ success: false, message: "Invalid admin credentials" });

    // IMPORTANT: token must include isAdmin: true
    const token = createToken({
      id: admin._id.toString(),
      email: admin.email,
      isAdmin: true
    });

    return res.json({ success: true, token });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ---------- ADMIN: ONE-TIME SEED ----------
export const seedAdmin = async (req, res) => {
  try {
    const email = process.env.ADMIN_EMAIL;
    const pass = process.env.ADMIN_PASSWORD;

    if (!email || !pass) {
      return res
        .status(400)
        .json({ success: false, message: "Set ADMIN_EMAIL & ADMIN_PASSWORD in .env" });
    }

    const exists = await adminModel.findOne({ email });
    if (exists) {
      return res.json({ success: true, message: "Admin already exists" });
    }

    const hashed = await bcrypt.hash(pass, 10);
    await adminModel.create({
      name: "Admin",
      email,
      password: hashed,
      isAdmin: true,                 // <- critical
      createdAt: new Date()
    });

    return res.json({ success: true, message: "Admin created" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};