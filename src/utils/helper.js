import { transporter } from "../config/mailer.js";

export const generateVerificationCode = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

export const sendVerificationEmail = async (email, code) => {
  await transporter.sendMail({
    from: `"devtinder 👨‍💻❤️" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify your email - Devtinder",
    html: `
      <h2>Welcome to devtinder 🚀</h2>
      <p>Your verification code is:</p>
      <h1 style="color:#e91e63;">${code}</h1>
      <p>This code is valid for 15 minutes. Please do not share it with anyone.</p>
    `,
  });
};

export const sendForgotPasswordOtpEmail = async (email, otp) => {
  await transporter.sendMail({
    from: `"devtinder 👨‍💻❤️" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Reset your DevTinder password",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Reset your password 🔐</h2>

        <p>
          We received a request to reset the password for your <strong>DevTinder</strong> account.
        </p>

        <p>Your One-Time Password (OTP) is:</p>

        <h1 style="color:#e91e63; letter-spacing: 2px;">
          ${otp}
        </h1>

        <p>
          This OTP is valid for <strong>10 minutes</strong>.
          Please enter it in the app to continue resetting your password.
        </p>

        <p style="color:#555;">
          If you did not request a password reset, you can safely ignore this email.
          Your account remains secure.
        </p>

        <hr />

        <p style="font-size: 12px; color: #888;">
          For security reasons, never share this OTP with anyone.
        </p>

        <p style="font-size: 12px; color: #888;">
          © ${new Date().getFullYear()} DevTinder. All rights reserved.
        </p>
      </div>
    `,
  });
};
