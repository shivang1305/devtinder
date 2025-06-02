const jwt = require("jsonwebtoken");
const { User } = require("../models/user/user.models");

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).send("Unauthorized Request");

  try {
    const decoded = await jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    const { _id } = decoded;

    const user = await User.findById(_id);

    if (!user) return res.status(404).send("User not found");

    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("Internal Server Error: " + error.message);
  }
};

module.exports = { userAuth };
