const express = require('express');
const { generateFeedbackHandler } = require('../controller/generateFeedbackController');

const router = express.Router();

/**
 * @swagger
 * /generate-feedback:
 *   post:
 *     summary: Generate feedback for a resume based on a job description
 *     tags: [Feedback Generation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               resume_text:
 *                 type: string
 *                 description: The resume text provided by the user.
 *                 example: "Experienced software engineer with Python and Java skills."
 *               job_description:
 *                 type: string
 *                 description: The job description text provided by the user.
 *                 example: "Looking for a software engineer with experience in Python, AWS, and REST APIs."
 *     responses:
 *       200:
 *         description: Feedback generated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 missing_keywords:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Keywords from the job description not found in the resume.
 *                   example: ["AWS", "REST APIs"]
 *                 suggestions:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Suggestions for improving the resume based on missing keywords or job description context.
 *                   example: [
 *                     "Mention any experience working with organizations like 'AWS'.",
 *                     "Highlight your proficiency with 'REST APIs'."
 *                   ]
 *       400:
 *         description: Invalid input data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message describing the issue with the input.
 *                   example: "Invalid or missing resume text."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating an issue on the server.
 *                   example: "Failed to generate feedback: Internal server error."
 */
router.post('/generate-feedback', generateFeedbackHandler);

module.exports = router;
