import * as fs from "fs";

export default function AuthenticatingUser(userDataFormat) {
  const filename = "student.csv";
  const headers = "Email,ChatID";

  // Clean and normalize input line
  const cleanLine = userDataFormat
    .replace(/[\r\n]+/g, "") // remove line breaks
    .trim(); // remove extra spaces

  // Split and trim parts
  const [email, chatId] = cleanLine.split(",").map((s) => s?.trim());

  if (!email || !chatId) {
    console.log("❌ Invalid user data format. Skipped.");
    return;
  }

  const finalEntry = `${email},${chatId}`;

  // If file doesn't exist, create it with headers
  if (!fs.existsSync(filename)) {
    fs.writeFileSync(filename, `${headers}\n${finalEntry}\n`);
    console.log("✅ CSV created and entry added.");
    return;
  }

  // Read file and sanitize existing entries
  const lines = fs
    .readFileSync(filename, "utf-8")
    .split("\n")
    .map((line) => line.replace(/[\r\n]+/g, "").trim())
    .filter((line) => line.length > 0);

  if (!lines.includes(finalEntry)) {
    fs.appendFileSync(filename, `${finalEntry}\n`);
    console.log("✅ Entry appended.");
  } else {
    console.log("⚠️ Duplicate entry detected. Skipped.");
  }
}
