import express from "express";
import "dotenv/config";
import { connectDB } from "./db/config.js";
import cors from "cors";
import {
  userLoginValidator,
  userSignupValidator,
} from "./validators/user.validators.js";
import { userLogin, userSignup } from "./controllers/user.controller.js";

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 6001;

app.post("/signup", userSignupValidator, userSignup);

app.post("/login", userLoginValidator, userLogin);

connectDB()
  .then(() => {
    console.log("DB is connected successfully");
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((err) => console.log("Error connecting to DB ", err));
