import sendOtp from "./utils/mailsending.js";
import optgeneration from "./utils/otpgeneration.js";
import promptSync from "prompt-sync";

const prompt = promptSync();

async function completeVerification() {
  const otp = optgeneration();
  await sendOtp("prakhargupta1568@gmail.com", otp);
  const userOtp = prompt("What is the otp");
  if (userOtp === otp) {
    console.log("Verification successful");
  }
}
await completeVerification();
console.log("Verification process completed");
