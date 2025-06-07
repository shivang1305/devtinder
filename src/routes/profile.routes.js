import express from "express";
import { getProfile } from "../controllers/profile.controller.js";
import { userAuth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/view", userAuth, getProfile);

export default router;
