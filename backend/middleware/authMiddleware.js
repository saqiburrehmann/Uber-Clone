import User from "../models/userModel.js";
import Captain from "../models/captainModel.js";
import jwt from "jsonwebtoken";
import BlackList from "../models/blackListTokenModel.js";

const auth = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }

  const blackListed = await BlackList.findOne({ token });

  if (blackListed) {
    return res
      .status(401)
      .json({ message: "unauthorized - token blacklisted" });
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

const captainAuth = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split("")[1];

  if (!token) {
    return res.status(400).json({ message: "Unauthorized" });
  }

  const blacklist = await BlackList.findOne({ token });
  if (blacklist) {
    return res
      .status(401)
      .json({ message: "unauthorized - token blacklisted" });
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const captain = await Captain.findById(decoded._id || decoded.id);

    req.captain = captain;

    return next();
  } catch (error) {
    return res.status(401).json({ message: "unauthorized" });
  }
};

export default { auth, captainAuth };
