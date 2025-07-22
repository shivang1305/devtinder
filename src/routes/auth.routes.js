import express from "express";
import {
  userLogin,
  userLogout,
  userEmailSignup,
  verifyEmail,
} from "../controllers/auth.controller.js";
import {
  userLoginValidator,
  emailSignupValidator,
} from "../validators/user.validators.js";

const router = express.Router();

router.post("/email/signup", emailSignupValidator, userEmailSignup);
router.post("/verify-email", verifyEmail);
router.post("/login", userLoginValidator, userLogin);
router.post("/logout", userLogout);

export default router;
