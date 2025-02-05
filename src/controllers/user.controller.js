import bcrypt from "bcrypt";
import { User } from "../models/user/user.models.js";

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
    res.send("user created successfully");
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

    const isCorrectPassword = await bcrypt.compare(password, passwordHash);

    if (isCorrectPassword) res.status(200).send("User logged in successfully");
    else res.status(401).send("Invalid user credentials");
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
};

export { userSignup, userLogin };
