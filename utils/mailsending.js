import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";
import optgeneration from "./otpgeneration.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default async function sendOtp(studentMailId) {
  const otp = await optgeneration();
  try {
    // Send the email using nodemailer
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: studentMailId,
      subject: "Email Verification ICS AM Bot",
      text: otp,
      html: `<p>Your OTP is: <b>${otp}</b></p>`,
    });
    return otp;
    console.log("Message sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
