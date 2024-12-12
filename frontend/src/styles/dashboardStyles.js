const dashboardStyles = {
    dashboard: { fontFamily: "Arial, sans-serif", margin: "20px", padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" },
    header: { textAlign: "center", marginBottom: "20px" },
    content: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" },
    widget: { backgroundColor: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" },
    widgetHeader: { marginBottom: "10px", color: "#333" },
    list: { paddingLeft: "20px" },
    button: { backgroundColor: "#007bff", color: "white", border: "none", padding: "10px 15px", borderRadius: "4px", cursor: "pointer" },
    buttonHover: { backgroundColor: "#0056b3" },
    textarea: { width: "100%", minHeight: "100px", margin: "10px 0", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "16px" },
    feedbackContainer: { marginTop: "20px", backgroundColor: "#f1f1f1", padding: "15px", borderRadius: "8px" },
    error: { color: "red", marginTop: "10px" },
  };
  
  export default dashboardStyles;
  