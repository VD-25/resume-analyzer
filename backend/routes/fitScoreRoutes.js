const express = require('express');
const { calculateFitScoreHandler } = require('../controller/fitScoreController');

const router = express.Router();

/**
 * @swagger
 * /fit-score:
 *   post:
 *     summary: Calculate the fit score between resume and job description
 *     tags: [Fit Score]
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
 *         description: Fit score and feedback returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fit_score:
 *                   type: integer
 *                   description: The calculated fit score
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
router.post('/fit-score', calculateFitScoreHandler);

module.exports = router;
