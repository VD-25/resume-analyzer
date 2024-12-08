const { LanguageServiceClient } = require('@google-cloud/language');
const { tokenizeAndNormalize } = require('./tokenizeAndNormalize');

const client = new LanguageServiceClient();

async function generateFeedback(resume_text, job_description) {
    if (!resume_text || typeof resume_text !== 'string') {
        return { error: 'Invalid or missing resume text.' };
    }
    if (!job_description || typeof job_description !== 'string') {
        return { error: 'Invalid or missing job description.' };
    }

    const resumeTokens = new Set(tokenizeAndNormalize(resume_text));

    const document = {
        content: job_description,
        type: 'PLAIN_TEXT',
    };

    try {
        const [response] = await client.analyzeEntities({ document });
        const jobEntities = response.entities || [];

        const missingKeywords = [];
        const suggestions = [];

        for (const entity of jobEntities) {
            const keyword = entity.name.toLowerCase();
            if (!resumeTokens.has(keyword)) {
                missingKeywords.push(keyword);
                switch (entity.type) {
                    case 'ORGANIZATION':
                        suggestions.push(`Mention any experience working with organizations like "${entity.name}".`);
                        break;
                    case 'SKILL':
                    case 'CONSUMER_GOOD':
                        suggestions.push(`Highlight your proficiency with "${entity.name}".`);
                        break;
                    case 'PERSON':
                        suggestions.push(`Consider mentioning any projects or collaborations with "${entity.name}".`);
                        break;
                    default:
                        suggestions.push(`Consider including content related to "${entity.name}".`);
                }
            }
        }

        return {
            missing_keywords: missingKeywords,
            suggestions,
        };
    } catch (error) {
        throw new Error(`Error analyzing entities with Google NLP: ${error.message}`);
    }
}

module.exports = { generateFeedback };
