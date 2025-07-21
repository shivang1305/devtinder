import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "Gmail", // or use SMTP config
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
