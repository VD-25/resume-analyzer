const request = require("supertest");
const express = require("express");
const resumeUploadRoutes = require("../backend/resumeUpload");
const path = require("path");

const app = express();
//app.use("/api", resumeUploadRoutes);
app.use("/api", resumeUploadRoutes);

describe("Resume Upload API", () => {
  it("should successfully upload a valid PDF file", async () => {
    const filePath = path.join(__dirname, "pdfFiles", "sample1_text.pdf");
    const response = await request(app)
      .post("/api/resume-upload")
      .attach("resume_file", filePath);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Resume uploaded successfully.");
    expect(response.body.textContent).toBeDefined(); // PDF text content extracted
  });

  it("should reject non-PDF files", async () => {
    const filePath = path.join(__dirname, "pdfFiles", "sample5_invalidFile.txt");
    const response = await request(app)
      .post("/api/resume-upload")
      .attach("resume_file", filePath);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Invalid file type. Only PDF files are allowed.");
  });

  it("should reject files larger than 2MB", async () => {
    const filePath = path.join(__dirname, "pdfFiles", "sample6_bigFile.pdf");
    const response = await request(app)
      .post("/api/resume-upload")
      .attach("resume_file", filePath);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("File too large");
  });

  it("should return an error when no file is uploaded", async () => {
    const response = await request(app).post("/api/resume-upload");

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("No file uploaded.");
  });
});
