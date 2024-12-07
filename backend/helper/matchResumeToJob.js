const { LanguageServiceClient } = require('@google-cloud/language');
const client = new LanguageServiceClient();

async function matchResumeToJob(jsonPath, key, getResumeAndJobDescriptionFromJSON) {
    const { resume, jobDescription } = await getResumeAndJobDescriptionFromJSON(jsonPath, key);

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

    try {
        const [result] = await client.analyzeEntities({ document });

        if (!result.entities || result.entities.length === 0) {
            return { fit_score: 0, feedback: ["No relevant entities found in the text."] };
        }

        const entities = result.entities.map(entity => ({
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

        return { fit_score: fitScore, feedback };
    } catch (error) {
        throw new Error(`Error calling Google Natural Language API: ${error.message}`);
    }
}

module.exports = { matchResumeToJob };
