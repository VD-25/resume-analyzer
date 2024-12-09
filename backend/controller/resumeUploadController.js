const multer = require("multer");
const upload = require("../config/multerConfig");
const { extractTextFromPdf } = require("../helper/pdfExtractor");

const resumeUploadHandler = (req, res) => {
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

      return res.status(200).json({
        message: "Resume uploaded successfully (no text extraction for docx).",
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "An error occurred while processing your request." });
    }
  });
};

module.exports = { resumeUploadHandler };
