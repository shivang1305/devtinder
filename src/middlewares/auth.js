import jwt from "jsonwebtoken";
import { User } from "../models/user/user.models.js";

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) return res.status(401).send("Unauthorized Request");

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const { _id } = decoded;

    const user = await User.findById(_id).select("-password");

    if (!user) return res.status(404).send("User not found");

    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("Internal Server Error: " + error.message);
  }
};

export { userAuth };
