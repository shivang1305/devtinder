import express from "express";
import {
  userLogin,
  userLogout,
  userSignup,
  verifyEmail,
} from "../controllers/auth.controller.js";
import {
  userLoginValidator,
  emailSignupValidator,
} from "../validators/user.validators.js";

const router = express.Router();

router.post("/email/signup", emailSignupValidator, userSignup);
router.post("/verify-email", verifyEmail);
router.post("/login", userLoginValidator, userLogin);
router.post("/logout", userLogout);

export default router;
