import express from "express";
import {
  userLogout,
  userEmailSignup,
  verifyEmail,
  userEmailLogin,
  userPhoneLogin,
} from "../controllers/auth.controller.js";
import {
  userEmailValidator,
  emailSignupValidator,
  userPhoneValidator,
} from "../validators/user.validators.js";

const router = express.Router();

router.post("/signup/email", emailSignupValidator, userEmailSignup);
router.post("/verify-email", verifyEmail);
router.post("/login/email", userEmailValidator, userEmailLogin);
router.post("/login/phone", userPhoneValidator, userPhoneLogin);
router.post("/logout", userLogout);

export default router;
