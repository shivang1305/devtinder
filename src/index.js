const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { adminAuth, userAuth } = require("./middlewares/auth.js");

console.log(process.env.PORT);

const app = express();

app.use(cors());

const port = process.env.PORT || 6001;

app.use("/admin", adminAuth);

app.get("/admin/getAllData", (req, res) => {
  res.send("All data sent");
});

app.delete("/admin/deleteUser", (req, res) => {
  res.send("User Deleted");
});

app.use("/user", userAuth, (req, res) => {
  throw new Error("User Error");
});

app.use("/", (err, req, res, next) => {
  if (err) res.status(500).send("Something went wrong");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
