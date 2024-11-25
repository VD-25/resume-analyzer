// DataDisplayComponent.js (React)
import React, { useState, useEffect } from 'react';

const AnalysisPage = () => {
  // State to store the fetched data
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    fetch('http://localhost:3000/api/analysis') // Make sure this matches your API URL
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Conditional rendering based on loading state and error
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="data-container">
      <h2>User Information</h2>
      <div className="data-card">
        <div className="data-item">
          <strong>ID:</strong> {data.id}
        </div>
        <div className="data-item">
          <strong>Name:</strong> {data.name}
        </div>
        <div className="data-item">
          <strong>Age:</strong> {data.age}
        </div>
        <div className="data-item">
          <strong>Email:</strong> {data.email}
        </div>
        <div className="data-item">
          <strong>Location:</strong> {data.location}
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;
