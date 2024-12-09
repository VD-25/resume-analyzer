const express = require('express');
const userSignUp = require('./userSignUpRoutes');
const jobDescriptionRoutes = require('./jobDescriptionRoutes');
const resumeUploadRoutes = require('./resumeUploadRoutes');
const resumeAnalysisRouter = require('./resumeAnalysisRoutes');
const feedbackRoutes = require('./generateFeedbackRoutes');
const fitScoreRoutes = require('./fitScoreRoutes');

const router = express.Router();

router.use("/user-signup", userSignUp);
router.use("/job-description", jobDescriptionRoutes);
router.use("/resume-upload", resumeUploadRoutes);
router.use("/resume-analysis", resumeAnalysisRouter);
router.use("/feedback", feedbackRoutes);
router.use("/fit-score", fitScoreRoutes);

module.exports = router;