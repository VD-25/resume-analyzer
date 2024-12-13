const express = require('express');
const storeData = require('../implementTempInMemoryStorage/storeData');

const router = express.Router();

/**
 * @swagger
 * /store-data:
 *   post:
 *     summary: Stores temporary data associated with a session ID
 *     tags: [Data Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sessionId:
 *                 type: string
 *                 description: The unique identifier of the session
 *                 required: true
 *               extractTextFromPdf:
 *                 type: string
 *                 description: The extracted text from a PDF
 *                 required: true
 *               jobDescription:
 *                 type: string
 *                 description: The job description text
 *                 required: true
 *     responses:
 *       201:
 *         description: Data stored successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 sessionId:
 *                   type: string
 *                   description: The session ID for the stored data
 *       400:
 *         description: Bad request (e.g., missing required data)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                 details:
 *                   type: string
 *                   description: Additional error details
 */
router.post('/store-data', storeData);

module.exports = router;
