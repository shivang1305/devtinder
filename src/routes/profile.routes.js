import express from "express";
import {
  changePassword,
  editProfile,
  getProfile,
} from "../controllers/profile.controller.js";
import { userAuth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/view", userAuth, getProfile);
router.patch("/edit", userAuth, editProfile);
router.patch("/change-password", userAuth, changePassword);

export default router;
