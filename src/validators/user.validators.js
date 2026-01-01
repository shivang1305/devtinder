import { check, validationResult } from "express-validator";
import { ALLOWED_UPATES } from "../utils/constants.js";

export const emailSignupValidator = [
  check("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 3, max: 40 })
    .withMessage("First name must be between 3 and 40 characters"),

  check("lastName")
    .optional()
    .trim()
    .isLength({ min: 3, max: 40 })
    .withMessage("Last name must be between 3 and 40 characters"),

  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address")
    .normalizeEmail(),

  check("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 3, max: 30 })
    .withMessage("Password must be between 3 and 30 characters")
    .isStrongPassword()
    .withMessage("Password is weak, enter a strong password"),

  check("phoneNumber")
    .optional()
    .trim()
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone number must be 10 digits")
    .isMobilePhone()
    .withMessage("Invalid phone number"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const userEmailValidator = [
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address")
    .normalizeEmail(),

  check("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 3, max: 30 })
    .withMessage("Password must be between 3 and 30 characters")
    .isStrongPassword()
    .withMessage("Password is weak, enter a strong password"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    next();
  },
];

export const userPhoneValidator = [
  check("phoneNumber")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone number must be 10 digits")
    .isMobilePhone()
    .withMessage("Invalid phone number"),
];

export const userProfileEditValidator = (req) => {
  const isUpdateValid = Object.keys(req.body).every((update) =>
    ALLOWED_UPATES.includes(update)
  );
  return isUpdateValid;
};
