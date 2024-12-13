const { tokenizeAndNormalize } = require('./tokenizeAndNormalize');

function calculateFitScore({ resume_text, job_description }) {
    if (!resume_text || typeof resume_text !== 'string') {
        return { error: 'Invalid or missing resume text.' };
    }
    if (!job_description || typeof job_description !== 'string') {
        return { error: 'Invalid or missing job description.' };
    }

    const resumeTokens = tokenizeAndNormalize(resume_text);
    const jobTokens = tokenizeAndNormalize(job_description);

    const jobTokenSet = new Set(jobTokens);
    const matchedKeywords = resumeTokens.filter(token => jobTokenSet.has(token));

    const fitScore = Math.round(
        (matchedKeywords.length / jobTokenSet.size) * 100
    );

    return {
        fit_score: fitScore,
        matched: matchedKeywords,
        total_keywords_in_job: jobTokenSet.size,
    };
}


module.exports = { calculateFitScore };
