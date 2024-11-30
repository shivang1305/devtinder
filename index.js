const express = require("express");
require("dotenv").config();

console.log(process.env.PORT);

const app = express();

const port = process.env.PORT || 6001;

const jsonData = {
  employee: {
    name: "sonoo",
    salary: 56000,
    married: true,
  },
};

// callback function in js
app.get("/", (req, res) => {
  res.send("Default API");
});

app.get("/home", (req, res) => {
  res.send("Hello World!");
});

app.get("/login", (req, res) => {
  res.send("<h1>Login Route</h1>");
});

app.get("/github", (req, res) => {
  res.json(jsonData);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
