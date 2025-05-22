import User from "../models/userModel.js";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { fullname, email, password } = req.body;

  try {
    //  Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists. Please login or use a different email.",
      });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      fullname: {
        firstname: fullname.firstname,
        lastname: fullname.lastname,
      },
      email,
      password: hashPassword,
    });

    // 🪙 Generate JWT token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.status(201).json({
      message: "User registered successfully",
      token,
    });
  } catch (err) {
    console.error("Registration Error: ", err.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    // Generate token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.cookie("token", token).status(200).json({
      message: "User logged in successfully",
      token,
    });
  } catch (err) {
    console.error("Login Error: ", err.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

const getProfile = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  res.status(200).json({
    _id: req.user._id,
    fullname: req.user.fullname,
    email: req.user.email,
  });
};

export default { createUser, loginUser, getProfile };
