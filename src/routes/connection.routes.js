import express from "express";
import { sendConnectionRequest } from "../controllers/connection.controller.js";
import { userAuth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/send/:status/:toUserId", userAuth, sendConnectionRequest);

export default router;
