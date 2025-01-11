const express = require("express");
require("dotenv").config();
const connectDB = require("./db/config.js");

const cors = require("cors");

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
