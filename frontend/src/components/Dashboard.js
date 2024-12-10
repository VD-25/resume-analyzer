import React from "react";
import "./styles.css";
import FitScore from './FitScore';
import MatchedSkills from './MatchedSkills';
import ImprovementSuggestions from './ImprovementSuggestions';

const Dashboard = () => {
  const styles = {
    dashboard: { fontFamily: "Arial, sans-serif", margin: "20px", padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" },
    header: { textAlign: "center", marginBottom: "20px" },
    content: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" },
    widget: { backgroundColor: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" },
    widgetHeader: { marginBottom: "10px", color: "#333" },
    list: { paddingLeft: "20px" },
    button: { backgroundColor: "#007bff", color: "white", border: "none", padding: "10px 15px", borderRadius: "4px", cursor: "pointer" },
    buttonHover: { backgroundColor: "#0056b3" },
  };

  const handleUploadClick = () => {
    const port = 3001;
    window.location.href = `http://localhost:${port}/upload`;
  };

  return (
    <div style={styles.dashboard}>
      <header style={styles.header}>
        <h1>Professional Dashboard</h1>
        <p>Your tools for crafting the perfect resume and applying for jobs.</p>
      </header>

      <div style={styles.content}>
        <section style={styles.widget}>
          <h2 style={styles.widgetHeader}>Job Description Matching</h2>
          <p>Upload a job description to identify required skills and tailor your resume accordingly.</p>
          <button onClick={handleUploadClick} style={styles.button} onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)} onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}>
            Upload Job Description
          </button>
        </section>
        <section style={styles.widget}>
          <h2 style={styles.widgetHeader}>Fit Score</h2>
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

        <section style={styles.widget}>
          <h2 style={styles.widgetHeader}>Grammar Tips</h2>
          <ul style={styles.list}>
            <li>Use action verbs like "developed," "managed," or "led."</li>
            <li>Avoid personal pronouns like "I" or "me."</li>
            <li>Check for spelling errors and consistency in tense.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
