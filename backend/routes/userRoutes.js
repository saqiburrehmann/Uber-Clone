import express from "express";
import userController from "../controllers/userController.js";
import { body } from "express-validator";

const router = express.Router();

//  Create user || Register
router.post(
  "/register",
  [
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("email").isEmail().withMessage("Invalid Email or password"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userController.createUser
);

// login user
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email or password"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userController.loginUser
);

export default router;
