const mailformat = /^[a-z][a-z0-9]*[0-9]{2}@iitk\.ac\.in$/;

// The function returns true/false for IITK email validity
export default function checkMailFormat(mailId) {
  const sanitized = mailId.trim();

  if (sanitized.length > 100 || sanitized.includes("..")) {
    return false;
  }

  return mailformat.test(sanitized);
}
