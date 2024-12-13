import React, { useState, useEffect } from "react";
import "../../styles/styles.css";
import FitScore from "../resume/FitScore";
import MatchedSkills from "../resume/MatchedSkills";
import ImprovementSuggestions from "../resume/ImprovementSuggestions";
import { generateFeedback } from "../../api/feedback";
import { calculateFitScore } from "../../api/fitscore";
import styles from "../../styles/dashboardStyles";
import jsPDF from "jspdf";

const Dashboard = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [feedback, setFeedback] = useState([]);
  const [fitScore, setFitScore] = useState(null);
  const [matchedKeywords, setMatchedKeywords] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateFeedback = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateFeedback(jobDescription);
      setFeedback(result.suggestions || []);
      setFitScore(result.fitScore || 0);
      setMatchedKeywords(result.matchedKeywords || []);
    } catch (err) {
      setError(err.message || "Failed to generate feedback.");
    } finally {
      setLoading(false);
    }
  };

  const handleCalculateFitScore = async () => {
    setError(null);
    setFitScore(null);

    try {
      const result = await calculateFitScore();
      setFitScore(result.fit_score); 
      setMatchedKeywords(result.matched || []); 
    } catch (err) {
      setError(err.message || 'An error occurred while calculating the fit score.');
    }
  };

  const handleExportPDF = async () => {
    if (fitScore === null) {
      setLoading(true);
      setError(null);
      try {
        // Fetch the fit score and matched keywords if not already available
        const result = await calculateFitScore();
        setFitScore(result.fit_score);
        setMatchedKeywords(result.matched || []);
      } catch (err) {
        setError(err.message || "Failed to fetch fit score.");
      } finally {
        setLoading(false);
      }
    }
  
    // Check if fitScore is still null (in case of an error during fetching)
    if (fitScore === null) {
      return; // Do not proceed if the fit score is still unavailable
    }
  
    // Proceed with PDF generation
    const doc = new jsPDF();
    const date = new Date().toLocaleDateString();
    let currentY = 10;
  
    doc.setFontSize(16);
    doc.text(`AI Resume Analysis Report as of ${date}`, 10, currentY);
    currentY += 20;
  
    doc.setFontSize(14);
    doc.text(`Fit Score: ${fitScore}%`, 10, currentY);
    currentY += 10;
  
    doc.text("Matched Skills:", 10, currentY);
    currentY += 10;
  
    matchedKeywords.forEach((skill) => {
      doc.text(`- ${skill}`, 20, currentY);
      currentY += 10;
      
      if (currentY > 270) {
        doc.addPage();
        currentY = 10;
      }
    });
  
    currentY += 10;
    doc.text("Improvement Suggestions:", 10, currentY);
    currentY += 10;
    doc.setFontSize(10);
    feedback.forEach((suggestion) => {
      doc.text(`- ${suggestion}`, 20, currentY, { maxWidth: 170 });
      currentY += 10;
      if (currentY > 280) {
        doc.addPage();
        currentY = 10;
      }
    });
  
    doc.save("aiResumeAnalysisReport.pdf");
  };
  
  
  return (
    <div style={styles.dashboard}>
      <header style={styles.header}>
        <h2>Your Personalized Resume Analysis Dashboard 😁</h2>
      </header>
      <div style={styles.content}>
        <section style={styles.widget}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <button
              onClick={handleGenerateFeedback}
              style={{
                ...styles.button,
                marginBottom: "10px", // Adds space between the two buttons
              }}
            >
              {loading ? "Generating..." : "Generate Feedback"}
            </button>
            <button
              onClick={handleExportPDF}
              style={{
                ...styles.button,
                marginLeft: "0", // Removes the default left margin
              }}
            >
              Export as PDF
            </button>
          </div>
          {error && <p style={styles.error}>{error}</p>}
        </section>
  
        <section style={styles.widget}>
          <h3 style={styles.widgetHeader}>Fit Score Analysis</h3>
          <FitScore fitScore={fitScore} loading={loading} />
        </section>
  
        <section style={styles.widget}>
          <h3 style={styles.widgetHeader}>Matched Skills</h3>
          <MatchedSkills matchedKeywords={matchedKeywords} loading={loading} />
        </section>
  
        <section style={styles.widget}>
          <h3 style={styles.widgetHeader}>Improvement Suggestions</h3>
          <ImprovementSuggestions feedback={feedback} loading={loading} />
        </section>
      </div>
    </div>
  );
  
  
};

export default Dashboard;
