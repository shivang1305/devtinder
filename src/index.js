import express from "express";
import "dotenv/config";
import { connectDB } from "./db/config.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

const corsOpts = {
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOpts));
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 6001;

import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import healthcheckRoutes from "./routes/healthcheck.routes.js";

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/healthcheck", healthcheckRoutes);

connectDB()
  .then(() => {
    console.log("DB is connected successfully");
    app.listen(port, () => {
      console.log(`DevTinder app listening on port ${port}`);
    });
  })
  .catch((err) => console.log("Error connecting to DB ", err));
