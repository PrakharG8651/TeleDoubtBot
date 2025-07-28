import { subjectMap } from "../subject_id.js";

// Function to check if id is present in subject_ids
function getSubject(id) {
    for (const [subject, groupId] of subjectMap.entries()) {
        if (groupId === id) {
            return subject;
        }
    }
    return null;
}

export { getSubject };