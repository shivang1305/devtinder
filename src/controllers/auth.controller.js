import bcrypt from "bcrypt";
import { User } from "../models/user/user.models.js";
import {
  generateVerificationCode,
  sendVerificationEmail,
} from "../utils/helper.js";

const options = {
  httpOnly: true,
  secure: true,
};

const userEmailSignup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const code = generateVerificationCode();

  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({
    firstName,
    lastName,
    email,
    password: passwordHash,
    verificationCode: code,
    verificationCodeExpiry: Date.now() + 15 * 60 * 1000, // 15 mins
  });

  try {
    await user.save();
    await sendVerificationEmail(email, code);
    res.status(201).json({
      status: 201,
      message: "User registered. Check email for verification code.",
    });
  } catch (error) {
    res.status(400).send("Error in creating user: " + error.message);
  }
};

const verifyEmail = async (req, res) => {
  const { email, code } = req.body;

  const user = await User.findOne({ email });

  if (!user || user.isEmailVerified)
    return res
      .status(400)
      .json({ status: 400, message: "User not found or already verified" });

  if (user.verificationCode !== code)
    return res
      .status(400)
      .json({ status: 400, message: "Invalid verification code" });

  if (user.verificationCodeExpiry < Date.now())
    return res
      .status(400)
      .json({ status: 400, message: "Verification code expired" });

  user.isEmailVerified = true;
  user.verificationCode = undefined;
  user.verificationCodeExpiry = undefined;

  await user.save();

  res.status(200).json({ status: 200, message: "Email verified successfully" });
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

export { userEmailSignup, userLogin, verifyEmail, userLogout };
