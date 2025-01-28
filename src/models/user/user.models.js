import mongoose from "mongoose";
import {
  ALLOWED_GENDER_VALUES,
  DEFAULT_IMAGE_URL,
} from "../../utils/constants.js";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 40,
    },
    lastName: {
      type: String,
      trim: true,
      minLength: 3,
      maxLength: 40,
    },
    email: {
      type: String,
      required: [true, "email id is required"],
      lowercase: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value))
          throw new Error("Email is invalid: " + value);
      },
    },
    password: {
      type: String,
      required: [true, "password is required"],
      trim: true,
      minLength: [3, "Password must be 3 characters or more"],
      maxLength: [30, "Password is too long"],
      validate(value) {
        if (!validator.isStrongPassword(value))
          throw new Error("Password is weak, enter a strong password");
      },
    },
    phoneNumber: {
      type: String,
      unique: true,
      trim: true,
      validate(value) {
        if (value.length != 10 || !validator.isMobilePhone(value))
          throw new Error("Not a valid phone number: " + value);
      },
    },
    photoUrl: {
      type: String,
      default: DEFAULT_IMAGE_URL,
      validate(value) {
        if (!validator.isURL(value))
          throw new Error("Photo URL is invalid: " + value);
      },
    },
    age: {
      type: Number,
      required: true,
      min: [16, "age cannot be less than 16"],
      max: [99, "age cannot be more than 99"],
    },
    gender: {
      type: String,
      required: true,
      validate(value) {
        if (!ALLOWED_GENDER_VALUES.includes(value.toUpperCase()))
          throw new Error("Gender data is not valid");
      },
    },
    interests: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);
// name of the collection in db
// local variable name of the schema
export const User = mongoose.model("User", userSchema);

// code - singluar + capital letter starting
// db - plural + small letter
