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
