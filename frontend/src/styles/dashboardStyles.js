const dashboardStyles = {
  dashboard: {
    fontFamily: 'Google Sans', 
    margin: "20px",
    padding: "20px",
    background: "white",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
  },
  content: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)", 
    gap: "60px",
  },

  section: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "10px",  
    cursor: "pointer",
    transition: "background-color 0.3s, box-shadow 0.3s",
    alignSelf: "center", 
    display: "block", 
    margin: "0 auto", 
  },
  buttonHover: {
    backgroundColor: "#45a049",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",  
  },

  textarea: { 
    width: "100%",
    minHeight: "100px",
    margin: "10px 0",
    padding: "10px",
    borderRadius: "0px",
    border: "0px",
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
