import express from "express";
import { body } from "express-validator";
import captainController from "../controllers/captainController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

//  Captain Register
router.post(
  "/register",
  [
    body("fullname.firstname")
      .trim()
      .notEmpty()
      .withMessage("First name is required")
      .isLength({ min: 2 })
      .withMessage("First name must be at least 2 characters"),

    body("fullname.lastname")
      .optional()
      .trim()
      .isLength({ min: 2 })
      .withMessage("Last name must be at least 2 characters"),

    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email format"),

    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),

    body("plate")
      .notEmpty()
      .withMessage("Vehicle plate is required")
      .isLength({ min: 3 })
      .withMessage("Plate must be at least 3 characters"),

    body("capacity")
      .notEmpty()
      .withMessage("Vehicle capacity is required")
      .isInt({ min: 1 })
      .withMessage("Capacity must be at least 1"),

    body("vehicleType")
      .notEmpty()
      .withMessage("Vehicle type is required")
      .isIn(["auto", "bike", "car"])
      .withMessage("Vehicle type must be auto, bike, or car"),

    body("color")
      .optional()
      .isString()
      .withMessage("Color must be a string")
      .isLength({ min: 3 })
      .withMessage("Color must be at least 3 characters"),
  ],
  captainController.createCaptain
);

// Captain Login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email or Password"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be 6 chracters long"),
  ],
  captainController.loginCaptain
);

// Captain Profile get with token or cookie
router.get("/", authMiddleware.captainAuth, captainController.getCaptainProfile);

// Captain Logout 
router.delete("/logout", authMiddleware.captainAuth, captainController.logoutProfile)


export default router;
