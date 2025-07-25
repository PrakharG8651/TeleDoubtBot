const mailformat = /^[a-z][a-z0-9]*[0-9]{2}@iitk\.ac\.in$/;
//The regrex patternf for IITK mail format

//The functions t/f
export default function checkMailFormat(mailId) {
  mailId = mailId.trim();
  if (sanitized.length > 100 || sanitized.includes("..")) {
    return false;
  }
  return mailformat.test(mailId);
}
