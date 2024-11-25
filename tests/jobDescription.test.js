const request = require("supertest");
const express = require("express");
const jobDescriptionRoutes = require("../backend/jobDescription");

const app = express();
app.use(express.json());
app.use("/api", jobDescriptionRoutes); // Ensure the routes are mounted

describe("Job Description API", () => {
  it("should successfully submit a valid job description", async () => {
    const response = await request(app)
      .post("/api/job-description")
      .send({
        job_description: "This is a valid job description.",
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Job description submitted successfully.");
    expect(response.body.cleanedText).toBe("This is a valid job description.");
  });

  it("should reject job descriptions exceeding 5000 characters", async () => {
    const longText = "a".repeat(5001);
    const response = await request(app)
      .post("/api/job-description")
      .send({
        job_description: longText,
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Job description exceeds character limit.");
  });

  it("should reject empty job descriptions", async () => {
    const response = await request(app)
      .post("/api/job-description")
      .send({
        job_description: "",
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Job description text is required.");
  });

  it("should clean job descriptions with extra whitespace", async () => {
    const response = await request(app)
      .post("/api/job-description")
      .send({
        job_description: "   This is   a   test   job description.   ",
      });

    expect(response.status).toBe(200);
    expect(response.body.cleanedText).toBe("This is a test job description.");
  });
});
