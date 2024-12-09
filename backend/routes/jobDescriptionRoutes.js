// routes/jobDescriptionRoutes.js
const express = require("express");
const { jobDescriptionHandler } = require("../controller/jobDescriptionController");

const router = express.Router();

/**
 * @swagger
 * /job-description:
 *   post:
 *     summary: Submit and process a job description
 *     tags: [Job Description]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               job_description:
 *                 type: string
 *                 description: The job description text
 *     responses:
 *       200:
 *         description: Job description submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 cleanedText:
 *                   type: string
 *                   description: Cleaned job description text
 *       400:
 *         description: Invalid input or processing error
 */
router.post("/job-description", jobDescriptionHandler);

module.exports = router;
