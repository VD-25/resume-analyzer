const express = require('express');
const retrieveData = require('../implementTempInMemoryStorage/retrieveData');
const router = express.Router();
/**
 * @swagger
 * /retrieve-data:
 *   get:
 *     summary: Retrieves data associated with a specific session ID
 *     tags: [Data Management]
 *     parameters:
 *       - in: query
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the session data to be retrieved
 *     responses:
 *       200:
 *         description: Data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sessionId:
 *                   type: string
 *                   description: The session ID
 *                 data:
 *                   type: object
 *                   description: The stored data associated with the session ID
 *       400:
 *         description: Bad request - sessionId is missing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating the missing sessionId
 *       404:
 *         description: Session data not found
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
router.get('/retrieve-data', retrieveData);

module.exports = router;