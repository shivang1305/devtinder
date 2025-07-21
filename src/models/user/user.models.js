import mongoose from "mongoose";
import {
  ALLOWED_GENDER_VALUES,
  DEFAULT_IMAGE_URL,
} from "../../utils/constants.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    // 🔑 Common Identity
    firstName: { type: String, trim: true, minLength: 3, maxLength: 40 },
    lastName: { type: String, trim: true, minLength: 3, maxLength: 40 },

    // 📨 Email login
    email: {
      type: String,
      lowercase: true,
      unique: true,
      sparse: true, // allow multiple nulls
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: "Invalid email format",
      },
    },
    isEmailVerified: { type: Boolean, default: false },

    // 📱 Phone login
    phoneNumber: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      validate(value) {
        if (value && (value.length !== 10 || !validator.isMobilePhone(value))) {
          throw new Error("Invalid phone number");
        }
      },
    },
    isPhoneVerified: { type: Boolean, default: false },

    // 🔐 Auth credentials
    password: {
      type: String,
      trim: true,
      minLength: [3, "Password must be 3 characters or more"],
      validate(value) {
        if (value && !validator.isStrongPassword(value)) {
          throw new Error("Password is weak");
        }
      },
    },

    // 🔗 Social Logins
    googleId: { type: String, unique: true, sparse: true },
    githubId: { type: String, unique: true, sparse: true },
    linkedinId: { type: String, unique: true, sparse: true },

    // 👤 Profile Info
    age: {
      type: Number,
      min: [16, "Must be 16+"],
      max: [99, "Too old for Tinder 😅"],
    },
    gender: {
      type: String,
      uppercase: true,
      enum: ALLOWED_GENDER_VALUES,
    },
    interests: [String],
    photoUrl: {
      type: String,
      default: DEFAULT_IMAGE_URL,
      validate: {
        validator: validator.isURL,
        message: "Invalid photo URL",
      },
    },
    bio: {
      type: String,
      maxLength: 300,
    },
    gallery: [
      {
        type: String,
        validate: {
          validator: validator.isURL,
          message: "Invalid image URL in gallery",
        },
      },
    ],

    // 🟢 Onboarding/UX Flags
    isProfileComplete: { type: Boolean, default: false },

    // 🕒 Verification Code Handling
    verificationCode: String,
    verificationCodeExpiry: Date,
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = async function (passwordInput) {
  return await bcrypt.compare(passwordInput, this.password);
};

userSchema.methods.getJWTToken = async function () {
  const token = await jwt.sign(
    { _id: this._id },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );

  return token;
};
// name of the collection in db
// local variable name of the schema
export const User = mongoose.model("User", userSchema);

// code - singluar + capital letter starting
// db - plural + small letter
