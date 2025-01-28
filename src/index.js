import express from "express";
import "dotenv/config";
import { connectDB } from "./db/config.js";
import cors from "cors";
import { User } from "./models/user/user.models.js";
import { ALLOWED_UPATES } from "./utils/constants.js";

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 6001;

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (!users.length) res.status(404).send("No user found");
    res.send(users);
  } catch (error) {
    res.status(400).send("Error in feed API");
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.email;

  try {
    const user = await User.find({ email: userEmail });
    if (!user.length) res.status(404).send("No user found");
    else res.send(user);
  } catch (error) {
    res.status(400).send("Error finding the user");
  }
});

app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send("user created successfully");
  } catch (error) {
    res.status(400).send("Error in creating user: " + error.message);
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) res.status(404).send("No user found");
    res.send(user);
  } catch (error) {
    res.status(400).send("Error finding the user");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPATES.includes(k)
    );

    if (!isUpdateAllowed) throw new Error("Update is not allowed");

    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!user) res.status(404).send("No user found");

    res.send("User updated successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

connectDB()
  .then(() => {
    console.log("DB is connected successfully");
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((err) => console.log("Error connecting to DB ", err));
