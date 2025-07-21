import bcrypt from "bcrypt";
import { User } from "../models/user/user.models.js";

const options = {
  httpOnly: true,
  secure: true,
};

const userSignup = async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber, age, gender } =
    req.body;

  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({
    firstName,
    lastName,
    email,
    password: passwordHash,
    phoneNumber,
    age,
    gender,
  });

  try {
    await user.save();
    res
      .status(201)
      .json({ status: 201, message: "User Registered successfully!!!" });
  } catch (error) {
    res.status(400).send("Error in creating user: " + error.message);
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) res.status(404).send("Invalid user credentials");
    const passwordHash = user.password;

    const isCorrectPassword = await user.comparePassword(password);

    if (isCorrectPassword) {
      // create a jwt token
      const token = await user.getJWTToken();
      if (!token) throw new Error("token is not generated");

      // store the token in the cookie
      res.cookie("token", token);
      res
        .status(200)
        .json({ status: 200, message: "User logged in successfully" });
    } else res.status(401).send("Invalid user credentials");
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
};

const userLogout = async (req, res) => {
  return res
    .status(200)
    .clearCookie("token", options)
    .json({ status: 200, message: "User Logout successfully!!!" });
};

export { userSignup, userLogin, userLogout };
