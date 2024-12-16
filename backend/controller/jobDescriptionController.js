const jobDescriptionHandler = (req, res) => {
    try {
      const { job_description } = req.body;
  
      if (!job_description) {
        return res.status(400).json({
          error: "Job description text is required.",
        });
      }
  
      if (job_description.length > 10000) {
        return res.status(400).json({
          error: "Job description exceeds character limit.",
        });
      }
  
      const cleanedText = job_description.replace(/\s+/g, " ").trim();
  
      return res.status(200).json({
        message: "Job description submitted successfully.",
        cleanedText,
      });
    } catch (err) {
      return res.status(400).json({
        error: "An error occurred while processing your request.",
      });
    }
  };
  
  module.exports = { jobDescriptionHandler };
  