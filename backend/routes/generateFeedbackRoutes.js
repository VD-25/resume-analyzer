// routes/generateFeedbackRoutes.js
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
 *                 description: The resume text
 *               job_description:
 *                 type: string
 *                 description: The job description text
 *     responses:
 *       200:
 *         description: Feedback generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 suggestions:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Suggestions for improving the resume
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal server error
 */
router.post('/generate-feedback', generateFeedbackHandler);

module.exports = router;
