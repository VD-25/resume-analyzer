const express = require("express");
const userSignUp = require("./userSignUp");
const jobDescriptionRoutes = require("./jobDescription")
const resumeUploadRoutes = require("./resumeUpload");

const app = express();
app.use(express.json());

// Mount job description routes under /api
app.use("/api", userSignUp);
app.use("/api", jobDescriptionRoutes);
app.use("/api", resumeUploadRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
