const { LanguageServiceClient } = require('@google-cloud/language');
const client = new LanguageServiceClient();
const generateOutput = require('../helper/generateOutput');
const generateErrorResponse = require('../helper/generateErrorResponse');

async function matchResumeToJob(jsonPath, key, getResumeAndJobDescriptionFromJSON) {
    try {
        const { resume, jobDescription } = await getResumeAndJobDescriptionFromJSON(jsonPath, key);

        if (!resume || !jobDescription) {
            return generateErrorResponse("Resume or job description is missing or invalid.");
        }

        const content = `
        Resume:
        ${resume}

        Job Description:
        ${jobDescription}
        `;

        const document = {
            content: content,
            type: 'PLAIN_TEXT',
        };

        const [result] = await client.analyzeEntities({ document });

        if (!result.entities || !Array.isArray(result.entities) || result.entities.length === 0) {
            return generateOutput(0, ["No relevant entities found in the text."]);
        }
        
        const entities = result.entities
            .filter(entity => entity.name && entity.type && typeof entity.salience === 'number')
            .map(entity => ({
                name: entity.name,
                type: entity.type,
                salience: entity.salience,
            }));

        const fitScore = Math.floor(
            entities.reduce((score, entity) => score + entity.salience, 0) * 100
        );

        const feedback = entities.map(entity => {
            if (entity.type === 'PERSON') {
                return `Expand on your role as '${entity.name}'.`;
            } else if (entity.type === 'ORGANIZATION') {
                return `Add more details about your work with '${entity.name}'.`;
            } else {
                return `Consider highlighting more about '${entity.name}' in the resume.`;
            }
        });

        return generateOutput(fitScore, feedback);
    } catch (error) {
        return generateErrorResponse("Failed to process data or call the NLP API.");
    }
}

module.exports = { matchResumeToJob };
