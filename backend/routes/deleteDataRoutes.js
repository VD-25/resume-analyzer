const express = require('express');
const deleteData = require('../implementTempInMemoryStorage/deleteData');

const router = express.Router();

/**
 * @swagger
 * /delete-data:
 *   delete:
 *     summary: Deletes data associated with a specific session ID
 *     tags: [Data Management]
 *     parameters:
 *       - in: query
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the session data to be deleted
 *     responses:
 *       200:
 *         description: Data deleted successfully
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
 *                   description: The deleted session ID
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
router.delete('/delete-data', deleteData);

module.exports = router;
