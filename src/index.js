import express from "express";
import "dotenv/config";
import { connectDB } from "./db/config.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 6001;

import authRoutes from "./routes/auth.routes.js";

app.use("/auth", authRoutes);

connectDB()
  .then(() => {
    console.log("DB is connected successfully");
    app.listen(port, () => {
      console.log(`DevTinder app listening on port ${port}`);
    });
  })
  .catch((err) => console.log("Error connecting to DB ", err));
