import express from "express";
import {
  reviewConnectionRequest,
  sendConnectionRequest,
} from "../controllers/connection.controller.js";
import { userAuth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/send/:status/:toUserId", userAuth, sendConnectionRequest);
router.post("/review/:status/:requestId", userAuth, reviewConnectionRequest);

export default router;
