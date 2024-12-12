const dashboardStyles = {
  dashboard: {
    fontFamily: 'Google Sans', 
    margin: "20px",
    padding: "20px",
    background: "linear-gradient(45deg, #CA3C25, #FF6F00, #FFEB3B, #00C853, #1E88E5, #8E24AA)",  // Rainbow gradient
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },

  header: {
    textAlign: "center",
    marginBottom: "40px",
  },
  content: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "15px",
  },
  widget: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  widgetHeader: {
    marginBottom: "10px",
    color: "#333",
  },
  list: {
    paddingLeft: "20px",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "10px",  // More rounded buttons
    cursor: "pointer",
    transition: "background-color 0.3s, box-shadow 0.3s",
  },
  buttonHover: {
    backgroundColor: "#CA3C25",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",  // Subtle shadow on hover
  },
  textarea: {
    width: "100%",
    minHeight: "100px",
    margin: "10px 0",
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  feedbackContainer: {
    marginTop: "20px",
    backgroundColor: "#CA3C25",
    padding: "15px",
    borderRadius: "10px",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
};

export default dashboardStyles;
