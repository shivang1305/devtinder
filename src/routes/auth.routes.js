import express from "express";
import {
  userLogout,
  userEmailSignup,
  verifyEmail,
  userEmailLogin,
} from "../controllers/auth.controller.js";
import {
  userEmailValidator,
  emailSignupValidator,
} from "../validators/user.validators.js";

const router = express.Router();

router.post("/signup/email", emailSignupValidator, userEmailSignup);
router.post("/verify-email", verifyEmail);
router.post("/login/email", userEmailValidator, userEmailLogin);
router.post("/logout", userLogout);

export default router;
