import otpGenerator from "otp-generator";

export default async function optgeneration() {
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });
  return otp;
}
