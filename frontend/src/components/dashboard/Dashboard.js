import React, { useState, useEffect } from "react";
import "../../styles/styles.css";
import FitScore from "../resume/FitScore";
import MatchedSkills from "../resume/MatchedSkills";
import ImprovementSuggestions from "../resume/ImprovementSuggestions";
import { generateFeedback } from "../../api/feedback";
import { calculateFitScore } from "../../api/fitscore";
import styles from "../../styles/dashboardStyles";
import jsPDF from "jspdf";
import FilterCheckboxsList from "./FilterCheckboxsList";

const Dashboard = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [fitScore, setFitScore] = useState(null);
  const [matchedKeywords, setMatchedKeywords] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [selectedFilters, setSelectedFilters] = useState([]);
  const filters = [
    { label: "Skill", value: "SKILL" },
    { label: "Experience", value: "EXPERIENCE" },
    { label: "Location", value: "LOCATION" },
    { label: "Organization", value: "ORGANIZATION" },
    { label: "Other", value: "OTHER" },
  ];
  const handleFilterChange = (value, isChecked) => {
    setSelectedFilters((prevFilters) =>
      isChecked ? [...prevFilters, value] : prevFilters.filter((filter) => filter !== value)
    );
  };

  const handleGenerateFeedback = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await calculateFitScore();
      setFitScore(result.fit_score);
      setMatchedKeywords(result.matched || []);
      
      // Generate and set feedback
      const feedbackResult = await generateFeedback(selectedFilters);
      setFeedback(feedbackResult);
    } catch (err) {
      setError(err.message || "Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const handleExportPDF = async () => {
    if (fitScore === null) {
      return;
    }
  
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
  
    if (feedback && feedback.suggestions.length > 0) {
      feedback.suggestions.forEach((suggestion, index) => {
        if (suggestion) {
          const lines = doc.splitTextToSize(`${index + 1}. ${suggestion}`, 170);
          lines.forEach((line, lineIndex) => {
            if (currentY > 270) {
              doc.addPage();
              currentY = 10;
            }
            doc.text(lineIndex === 0 ? line : `   ${line}`, 20, currentY);
            currentY += 10;
          });
          currentY += 5; 
        }
      });
    } else {
      doc.text("No improvement suggestions available.", 20, currentY);
    }
  
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
                marginBottom: "10px",
              }}
            >
              {loading ? "Generating..." : "Generate Feedback"}
            </button>
            <button
              onClick={handleExportPDF}
              style={{
                ...styles.button,
                marginLeft: "0", 
              }}
            >
              Export as PDF
            </button>
          </div>
          <FilterCheckboxsList filters={filters} selectedFilters={selectedFilters} onFilterChange={handleFilterChange}/>
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
          {feedback && feedback.suggestions.length > 0 && <ImprovementSuggestions feedback={feedback} loading={loading} />}
        </section>
      </div>
    </div>
  );
  
  
};

export default Dashboard;