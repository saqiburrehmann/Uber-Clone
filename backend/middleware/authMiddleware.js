import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);

    req.user = user;

    return next();
  } catch (error) {
    return res.status(401).json({ message: "unauthorized" });
  }
};

export default { auth };
