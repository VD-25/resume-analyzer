// routes/compareResumeRoutes.js
const express = require('express');
const { compareResumeHandler } = require('../controller/compareResumeController');

const router = express.Router();

/**
 * @swagger
 * /compare-resume:
 *   post:
 *     summary: Compare a resume against a job description
 *     tags: [Resume Comparison]
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
 *         description: Resume comparison result returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fit_score:
 *                   type: integer
 *                   description: Fit score calculated from the comparison
 *                 feedback:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Feedback based on the comparison
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal server error
 */
router.post('/compare-resume', compareResumeHandler);

module.exports = router;
