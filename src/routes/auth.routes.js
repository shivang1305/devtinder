import express from "express";
import {
  userLogin,
  userLogout,
  userSignup,
} from "../controllers/auth.controller.js";
import {
  userLoginValidator,
  userSignupValidator,
} from "../validators/user.validators.js";

const router = express.Router();

router.post("/signup", userSignupValidator, userSignup);
router.post("/login", userLoginValidator, userLogin);
router.post("/logout", userLogout);

export default router;
