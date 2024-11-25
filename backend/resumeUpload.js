const multer = require("multer");
const { extractTextFromPdf } = require("./pdfExtractor");
const express = require("express");

const router = express.Router();

// Multer configuration for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB file size limit
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only PDF or docx files are allowed."));
    }
  },
});

// Endpoint: Resume Upload
router.post("/resume-upload", (req, res) => {
  upload.single("resume_file")(req, res, async (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({ error: "File too large" });
        }
      } else {
        return res.status(400).json({ error: err.message });
      }
    }
    try {
      const file = req.file;

      if (!file) {
        return res.status(400).json({
          error: "No file uploaded.",
        });
      }

      if (file.mimetype === "application/pdf") {
        const extractedText = await extractTextFromPdf(file.buffer);
        return res.status(200).json({
          message: "Resume uploaded successfully.",
          textContent: extractedText,
        });
      }

      // For docx: Validation complete but no processing
      return res.status(200).json({
        message: "Resume uploaded successfully (no text extraction for docx).",
      });
    } catch (error) {
      return res.status(500).json({ error: "An error occurred while processing your request." });
    }
  });
});

module.exports = router;
