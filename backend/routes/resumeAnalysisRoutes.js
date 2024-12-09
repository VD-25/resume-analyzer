require('dotenv').config();
const express = require('express');
const { analyzeApplicationHandler } = require('../controller/resumeAnalysisController');
const compareResumeRouter = require('./compareResumeRoutes');

const router = express.Router();

/**
 * @swagger
 * /analyze-application:
 *   post:
 *     summary: Analyze a job application from JSON input
 *     tags: [Resume Analysis]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               jsonPath:
 *                 type: string
 *                 description: Path to the JSON file
 *               key:
 *                 type: string
 *                 description: Key to retrieve specific data
 *     responses:
 *       200:
 *         description: Application analyzed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
router.post('/analyze-application', analyzeApplicationHandler);

router.use(compareResumeRouter);

module.exports = router;
