const fs = require('fs').promises;

async function getResumeAndJobDescriptionFromJSON(jsonPath, key) {
    try {
        const data = await fs.readFile(jsonPath, 'utf-8');
        const parsedData = JSON.parse(data);
        const applicationData = parsedData[key];

        if (!applicationData) {
            throw new Error(`Key '${key}' not found in the JSON file.`);
        }

        const { extractTextFromPdf: resume, jobDescription } = applicationData;

        if (!resume || !jobDescription) {
            throw new Error('Both resume and job description must be present under the provided key.');
        }

        if (resume.length > 10000 || jobDescription.length > 10000) {
            throw new Error('Resume and job description must not exceed 10,000 characters each.');
        }

        return { resume, jobDescription };
    } catch (error) {
        throw new Error(`Error reading JSON file: ${error.message}`);
    }
}

module.exports = { getResumeAndJobDescriptionFromJSON };