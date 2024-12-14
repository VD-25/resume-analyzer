const multer = require("multer");

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB file size limit
    fileFilter: (req, file, cb) => {
      const allowedMimeTypes = ["application/pdf","application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error("Invalid file type. Only PDF files are allowed."));
      }
    },
  });
module.exports = upload;
