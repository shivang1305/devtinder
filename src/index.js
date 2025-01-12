import express from "express";
import "dotenv/config";
import { connectDB } from "./db/config.js";
import cors from "cors";

const app = express();

app.use(cors());

const port = process.env.PORT || 6001;

connectDB()
  .then(() => {
    console.log("DB is connected successfully");
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch(() => console.log("Error connecting to DB"));
