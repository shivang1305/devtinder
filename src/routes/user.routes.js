import express from "express";
import {
  getPendingConnectionRequests,
  getUserConnections,
  userFeed,
} from "../controllers/user.controller.js";
import { userAuth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/requests/received", userAuth, getPendingConnectionRequests);
router.get("/connections", userAuth, getUserConnections);
router.get("/feed", userAuth, userFeed);

export default router;
