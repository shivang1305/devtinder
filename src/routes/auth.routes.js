import express from "express";
import {
  userLogout,
  userEmailSignup,
  verifyEmail,
  userEmailLogin,
  userPhoneLogin,
  forgotPassword,
  loginAfterForgotPass,
} from "../controllers/auth.controller.js";
import {
  userEmailValidator,
  emailSignupValidator,
  userPhoneValidator,
  userPasswordVaidator,
} from "../validators/user.validators.js";

const router = express.Router();

router.post("/signup/email", emailSignupValidator, userEmailSignup);
router.post("/verify-email", verifyEmail);
router.post(
  "/login/email",
  userEmailValidator,
  userPasswordVaidator,
  userEmailLogin
);
router.post("/login/phone", userPhoneValidator, userPhoneLogin);
router.post("/forgot-password", userEmailValidator, forgotPassword);
router.post("/forgot-password/login", userEmailValidator, loginAfterForgotPass);
router.post("/logout", userLogout);

export default router;
