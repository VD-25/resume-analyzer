const express = require('express');
const { calculateFitScore } = require('./helper/calculateFitScore');

const router = express.Router();

router.post('/compare-resume', (req, res) => {
    try {
        const { resume_text, job_description } = req.body;

        if (!resume_text || !job_description) {
            return res.status(400).json({ error: 'resume_text and job_description are required.' });
        }

        const result = calculateFitScore({ resume_text, job_description });

        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        res.json(result);
    } catch (error) {
        console.error('Error in compare-resume route:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
