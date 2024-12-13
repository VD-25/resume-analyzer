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

    console.log('Received inputs:', { resume_text, job_description });

    const resumeTokens = new Set(tokenizeAndNormalize(resume_text));
    console.log('Normalized Resume Tokens:', [...resumeTokens]);

    const document = {
        content: job_description,
        type: 'PLAIN_TEXT',
    };

    try {
        const [response] = await client.analyzeEntities({ document });
        console.log('Google NLP Entities:', response.entities);

        const jobEntities = response.entities || [];
        const missingKeywords = [];
        const suggestions = [];

        for (const entity of jobEntities) {
            const normalizedEntityTokens = tokenizeAndNormalize(entity.name);
            console.log(`Entity: ${entity.name}`);
            console.log('Normalized Entity Tokens:', normalizedEntityTokens);

            const isEntityPartiallyCovered = normalizedEntityTokens.some((token) => resumeTokens.has(token));
            console.log('Is entity partially covered:', isEntityPartiallyCovered);

            if (!isEntityPartiallyCovered) {
                missingKeywords.push(entity.name);
                const feedback = generateFeedbackForEntity(entity);
                if (feedback) {
                    suggestions.push(feedback);
                }
            }
        }

        const responseObject = {
            missing_keywords: missingKeywords,
            suggestions: suggestions,
        };
        console.log('Missing Keywords:', missingKeywords);
        console.log('Suggestions:', suggestions);


        console.log('Generated Response:', responseObject);

        return responseObject;
    } catch (error) {
        console.error('Error in generateFeedback:', error.message);
        return { error: `Failed to generate feedback: ${error.message}` };
    }
}

function generateFeedbackForEntity(entity) {
    switch (entity.type) {
        case 'ORGANIZATION':
            return `Mention any experience working with organizations like "${entity.name}".`;
        case 'SKILL':
        case 'CONSUMER_GOOD':
        case 'OTHER':
            return `Highlight your proficiency with "${entity.name}".`;
        case 'PERSON':
            return `Consider mentioning any projects or collaborations with "${entity.name}".`;
        default:
            return `Consider including content related to "${entity.name}".`;
    }
}

module.exports = { generateFeedback };
