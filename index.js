const express = require("express");
const app = express();

const port = 5001;

const jsonData = {
  employee: {
    name: "sonoo",
    salary: 56000,
    married: true,
  },
};

// callback function in js
app.get("/", (req, res) => {
  res.send("Default Route");
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
