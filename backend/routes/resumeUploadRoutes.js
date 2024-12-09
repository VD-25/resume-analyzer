// routes/resumeUploadRoutes.js
const express = require("express");
const { resumeUploadHandler } = require("../controller/resumeUploadController");

const router = express.Router();

/**
 * @swagger
 * /resume-upload:
 *   post:
 *     summary: Upload a resume file and optionally extract text from PDFs
 *     tags: [Resume Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               resume_file:
 *                 type: string
 *                 format: binary
 *                 description: The resume file to upload
 *     responses:
 *       200:
 *         description: Resume uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 textContent:
 *                   type: string
 *                   description: Extracted text from the resume (if PDF)
 *       400:
 *         description: Invalid input or file upload error
 *       500:
 *         description: Internal server error
 */
router.post("/resume-upload", resumeUploadHandler);

module.exports = router;
