import mongoose from "mongoose";
import { DEFAULT_IMAGE_URL } from "../../utils/constants.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      min: [3, "Password must be 3 characters or more"],
    },
    phoneNumber: {
      type: String,
      min: [10, "Phone number must be of 10 digits"],
      max: [10, "Phone number cannot be more than 10 digits"],
    },
    photoUrl: {
      type: String,
      deafult: DEFAULT_IMAGE_URL,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      validate(value) {
        if (!["male", "female", "other"].includes(value))
          throw new Error("Gender data is not valid");
      },
    },
  },
  { timestamps: true }
);
// name of the collection in db
// local variable name of the schema
export const User = mongoose.model("User", userSchema);

// code - singluar + capital letter starting
// db - plural + small letter
