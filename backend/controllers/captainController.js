import { validationResult } from "express-validator";
import Captain from "../models/captainModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const createCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, plate, capacity, vehicleType, color } =
    req.body;

  try {
    const existingUser = await Captain.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message:
          "Captain already exists. Please login or use a different email.",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const captain = await Captain.create({
      fullname: {
        firstname: fullname.firstname,
        lastname: fullname.lastname,
      },
      email,
      password: hashPassword,
      vehicle: {
        color: color || "white",
        plate,
        capacity,
        vehicleType,
      },
    });

    const token = jwt.sign({ _id: captain._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(201).json({
      message: "Captain registered successfully",
      token,
      captain,
    });
  } catch (err) {
    console.error("Registration Error:", err.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

const loginCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    // Check Email
    const captain = await Captain.findOne({ email }).select("+password");
    if (!captain) {
      return res.status(401).json("Invalid Email or Password");
    }

    // Compare Password
    const isMatch = await captain.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    const token = captain.generateAuthToken();

    res.cookie("token", token).status(200).json({
      message: "Login successful",
      token,
      captain,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default { createCaptain, loginCaptain };
