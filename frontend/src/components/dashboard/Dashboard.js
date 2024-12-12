import React, { useState } from "react";
import "../../styles/styles.css";
import FitScore from "../resume/FitScore";
import MatchedSkills from "../resume/MatchedSkills";
import ImprovementSuggestions from "../resume/ImprovementSuggestions";
import { generateFeedback } from "../../api/feedback";
import styles from "../../styles/dashboardStyles";

const Dashboard = () => {
  const [jobDescription, setJobDescription] = useState(""); 
  const [feedback, setFeedback] = useState([]); 
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(false);

  const handleGenerateFeedback = async () => {
    setError(null);
    setLoading(true);
    try {
      const result = await generateFeedback(jobDescription);
      setFeedback(result.suggestions || []); 
    } catch (err) {
      setError(err || "Failed to generate feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.dashboard}>
      <header style={styles.header}>
        <h1>Good evening, here is your personalized Resume Analysis Dashboard 😁</h1>
      </header>

      <div style={styles.content}>
        <section style={styles.widget}>
          <h2 style={styles.widgetHeader}>Job Description Matching </h2>
          <p>Paste a job description below to tailor your resume accordingly.</p>
          <textarea
            style={styles.textarea}
            placeholder="Paste the job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
          <button
            onClick={handleGenerateFeedback}
            style={styles.button}
            onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          >
            {loading ? "Generating..." : "Generate Feedback"}
          </button>
          {error && <p style={styles.error}>{error}</p>}
          {feedback.length > 0 && (
            <div style={styles.feedbackContainer}>
              <h3>Feedback Suggestions:</h3>
              <ul>
                {feedback.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
        <section style={styles.widget}>
          <h2 style={styles.widgetHeader}>Fit Score Analysis</h2>
          <FitScore />
        </section>

        <section style={styles.widget}>
          <h2 style={styles.widgetHeader}>Matched Skills</h2>
          <MatchedSkills />
        </section>

        <section style={styles.widget}>
          <h2 style={styles.widgetHeader}>Improvement Suggestions</h2>
          <ImprovementSuggestions />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;