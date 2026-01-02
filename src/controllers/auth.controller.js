import { User } from "../models/user/user.models.js";
import {
  generateVerificationCode,
  sendForgotPasswordOtpEmail,
  sendVerificationEmail,
} from "../utils/helper.js";

const options = {
  httpOnly: true,
  secure: true,
};

const userEmailSignup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const code = generateVerificationCode();
  const user = new User({
    firstName,
    lastName,
    email,
    password: password,
    verificationCode: code,
    verificationCodeExpiry: Date.now() + 15 * 60 * 1000, // 15 mins
  });

  try {
    await user.save();
    // await sendVerificationEmail(email, code);
    res.status(201).json({
      status: 201,
      message: "User registered. Check email for verification code.",
    });
  } catch (error) {
    res.status(400).send("Error in creating user: " + error.message);
  }
};

const loginAfterEmailVerify = async (req, res) => {
  const { email, code } = req.body;

  try {
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

    res
      .status(200)
      .json({ status: 200, message: "Email verified successfully" });
  } catch (error) {
    res.status(400).send("Email verification failed: ", error.message);
  }
};

const userEmailLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) res.status(404).send("Invalid user credentials");

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
    res.status(400).send("Email login failed: ", error.message);
  }
};

const userPhoneLogin = async (req, res) => {
  const { phoneNumber } = req.body;

  try {
    const user = await User.findOne({ phoneNumber });

    if (!user)
      res
        .status(404)
        .json({ status: 404, message: "No user found with this phone number" });

    const token = await user.getJWTToken();

    if (!token) throw new Error("token is not generated");

    res.cookie("token", token);
    res
      .status(200)
      .json({ status: 200, message: "User logged in successfully" });
  } catch (error) {
    res.status(400).send("Phone login failed: ", error.message);
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User with this email does not exist",
      });
    }

    const otp = generateVerificationCode();
    user.forgotPasswordOtp = otp;
    user.forgotPasswordOtpExpiry = Date.now() + 10 * 60 * 1000;
    await user.save();

    await sendForgotPasswordOtpEmail(email, otp);

    res.status(200).json({
      message: "OTP sent to your email for password reset",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error in forgot password",
      error: err.message,
    });
  }
};

const loginAfterForgotPass = async (req, res) => {
  const { email, code } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user)
      return res
        .status(400)
        .json({ status: 400, message: "This is email id does not exist" });

    if (user.forgotPasswordOtp !== code)
      return res.status(400).json({ status: 400, message: "Invalid otp" });

    if (user.forgotPasswordOtpExpiry < Date.now())
      return res
        .status(400)
        .json({ status: 400, message: "Forgot password otp expired" });

    user.forgotPasswordOtp = undefined;
    user.forgotPasswordOtpExpiry = undefined;

    await user.save();

    res.status(200).json({
      status: 200,
      message: "Login successfull, please change the password now",
    });
  } catch (error) {
    res.status(400).send("Forgot password login failed: ", error.message);
  }
};

const userLogout = async (req, res) => {
  return res
    .status(200)
    .clearCookie("token", options)
    .json({ status: 200, message: "User Logout successfully!!!" });
};

export {
  userEmailSignup,
  userEmailLogin,
  loginAfterEmailVerify as verifyEmail,
  userPhoneLogin,
  forgotPassword,
  loginAfterForgotPass,
  userLogout,
};
