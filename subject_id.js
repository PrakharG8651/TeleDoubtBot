import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

/**
 * Get subject ID from environment variables
 * @param {string} subjectCode - The subject code (e.g., 'LIF111')
 * @returns {string|null} - The group ID from env or null if not found
 */
function getSubjectId(subjectCode) {
  const envKey = `${subjectCode}_GROUP_ID`;
  return process.env[envKey] || null;
}

/**
 * Get all subject codes from subjects.txt file
 * @returns {Set<string>} - Set of all subject codes
 */
function getAllSubjects() {
  const subjectsFilePath = path.join(__dirname, "subjects.txt");

  try {
    if (fs.existsSync(subjectsFilePath)) {
      const fileContent = fs.readFileSync(subjectsFilePath, "utf8");
      const subjects = fileContent
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

      return new Set(subjects);
    } else {
      console.warn("subjects.txt file not found. Creating empty set.");
      return new Set();
    }
  } catch (error) {
    console.error("Error reading subjects.txt:", error);
    return new Set();
  }
}

/**
 * Get all subject IDs mapped with their codes
 * @returns {Map<string, string>} - Map of subject codes to their group IDs
 */
function getAllSubjectIds() {
  const subjects = getAllSubjects();
  const subjectMap = new Map();

  subjects.forEach((subject) => {
    const groupId = getSubjectId(subject);
    if (groupId) {
      subjectMap.set(subject, groupId);
    }
  });

  return subjectMap;
}

const subjectMap = getAllSubjectIds();

export {
    subjectMap
};
