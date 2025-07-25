import otpGenerator from "otp-generator";

export default function optgeneration() {
  return otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });
}
