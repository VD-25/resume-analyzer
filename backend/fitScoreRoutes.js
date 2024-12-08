const express = require('express');
const { calculateFitScore } = require('./helper/calculateFitScore');
const { generateFeedback } = require('./helper/generateFeedback');

const router = express.Router();

router.post('/fit-score', async (req, res) => {
    const { resume_text, job_description } = req.body;
    if (!resume_text || !job_description) {
        return res.status(400).json({ error: 'Both resume_text and job_description are required.' });
    }
    if (typeof resume_text !== 'string' || typeof job_description !== 'string') {
        return res.status(400).json({ error: 'Invalid input. Both fields must be strings.' });
    }
    if (resume_text.length > 10000 || job_description.length > 10000) {
        return res.status(400).json({ error: 'Input exceeds maximum character limit of 10,000.' });
    }

    try {
        const fitScoreResult = calculateFitScore({ resume_text, job_description });
        const feedbackResult = await generateFeedback(resume_text, job_description);

        const response = {
            fit_score: fitScoreResult.fit_score,
            feedback: feedbackResult.suggestions,
        };

        res.status(200).json(response);
    } catch (error) {
        //console.error('Error processing fit score:', error.message);
        res.status(500).json({ error: 'An error occurred while processing the fit score and feedback.' });
    }
});

module.exports = router;
