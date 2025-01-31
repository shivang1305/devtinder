import { body } from "express-validator";

export const userSignupValidator = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 3, max: 40 })
    .withMessage("First name must be between 3 and 40 characters"),

  body("lastName")
    .optional()
    .trim()
    .isLength({ min: 3, max: 40 })
    .withMessage("Last name must be between 3 and 40 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address")
    .normalizeEmail(),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 3, max: 30 })
    .withMessage("Password must be between 3 and 30 characters")
    .isStrongPassword()
    .withMessage("Password is weak, enter a strong password"),

  body("phoneNumber")
    .optional()
    .trim()
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone number must be 10 digits")
    .isMobilePhone()
    .withMessage("Invalid phone number"),

  body("photoUrl").optional().trim().isURL().withMessage("Invalid photo URL"),

  body("age")
    .notEmpty()
    .withMessage("Age is required")
    .isInt({ min: 16, max: 99 })
    .withMessage("Age must be between 16 and 99"),

  body("gender")
    .notEmpty()
    .withMessage("Gender is required")
    .custom((value) => {
      const ALLOWED_GENDER_VALUES = ["MALE", "FEMALE", "OTHER"];
      if (!ALLOWED_GENDER_VALUES.includes(value.toUpperCase())) {
        throw new Error("Gender data is not valid");
      }
      return true;
    }),

  body("interests")
    .optional()
    .isArray()
    .withMessage("Interests must be an array")
    .custom((values) => {
      if (!values.every((item) => typeof item === "string")) {
        throw new Error("Each interest must be a string");
      }
      return true;
    }),
];
