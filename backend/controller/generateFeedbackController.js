const { generateFeedback } = require('../helper/generateFeedback');

const generateFeedbackHandler = (req, res) => {
    const { resume_text, job_description } = req.body;

    if (!resume_text || !job_description) {
        return res.status(400).json({ error: 'resume_text and job_description are required.' });
    }

    try {
        const feedback = generateFeedback(resume_text, job_description);
        res.json(feedback);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { generateFeedbackHandler };
