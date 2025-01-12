import express from "express";
import "dotenv/config";
import { connectDB } from "./db/config.js";
import cors from "cors";
import { User } from "./models/user/user.models.js";

const app = express();

app.use(cors());

const port = process.env.PORT || 6001;

app.post("/signup", async (req, res) => {
  const user = new User({
    name: "Shivang Sharma",
    email: "shivang@gmail.com",
    password: "shivang@123",
    phoneNumber: "9876543210",
    age: 25,
    gender: "M",
  });

  try {
    await user.save();
    res.send("user created successfully");
  } catch (error) {
    res.status(400).send("Error in creating user");
  }
});

connectDB()
  .then(() => {
    console.log("DB is connected successfully");
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch(() => console.log("Error connecting to DB"));
