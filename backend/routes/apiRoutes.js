const express = require('express');
const userSignUp = require('./userSignUpRoutes');
const jobDescriptionRoutes = require('./jobDescriptionRoutes');
const resumeUploadRoutes = require('./resumeUploadRoutes');
const resumeAnalysisRouter = require('./resumeAnalysisRoutes');
const feedbackRoutes = require('./generateFeedbackRoutes');
const fitScoreRoutes = require('./fitScoreRoutes');

const router = express.Router();

router.use("", userSignUp);
router.use("", jobDescriptionRoutes);
router.use("", resumeUploadRoutes);
router.use("", resumeAnalysisRouter);
router.use("", feedbackRoutes);
router.use("", fitScoreRoutes);

module.exports = router;