const { generateFeedback } = require('../helper/generateFeedback');

const generateFeedbackHandler = async (req, res) => {
    try {
        const { resume_text, job_description, selected_filters } = req.body;

        if (!resume_text || !job_description) {
            return res.status(400).json({ error: 'Both resume_text and job_description are required.' });
        }

        const feedback = await generateFeedback(resume_text, job_description, selected_filters);

        return res.status(200).json(feedback);
    } catch (error) {
        console.error('Error in generateFeedbackHandler:', error.message);
        return res.status(500).json({ error: 'Failed to generate feedback.' });
    }
};

module.exports = { generateFeedbackHandler };
