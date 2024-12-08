const cors = require("cors");
const express = require("express");
const userSignUp = require("./userSignUp");
const jobDescriptionRoutes = require("./jobDescription")
const resumeUploadRoutes = require("./resumeUpload");
const analysis = require("./resumeAnalysisRouter");
const resumeAnalysisRouter = require('./resumeAnalysisRouter');
const feedbackRoutes = require('./generateFeedbackRouter');
const fitScoreRoutes = require('./fitScoreRoutes');

const app = express();
app.use(cors({origin: "*"}));
app.use(express.json());

// Mount job description routes under /api
app.use("/api", userSignUp);
app.use("/api", jobDescriptionRoutes);
app.use("/api", resumeUploadRoutes);
app.use("/api", analysis);
app.use('/api', resumeAnalysisRouter);
app.use('/api', feedbackRoutes);
app.use('/api', fitScoreRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
