import express from "express";
import { userLogin, userSignup } from "../controllers/auth.controller.js";
import {
  userLoginValidator,
  userSignupValidator,
} from "../validators/user.validators.js";

const router = express.Router();

router.post("/signup", userSignupValidator, userSignup);
router.post("/login", userLoginValidator, userLogin);

export default router;
