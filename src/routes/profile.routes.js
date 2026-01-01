import express from "express";
import { editProfile, getProfile } from "../controllers/profile.controller.js";
import { userAuth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/view", userAuth, getProfile);
router.patch("/edit", userAuth, editProfile);

export default router;
