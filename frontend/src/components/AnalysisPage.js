// DataDisplayComponent.js (React)
import React, { useState, useEffect } from 'react';

const AnalysisPage = () => {
  // State to store the fetched data

  const [data, setData] = useState('null');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data from the API when the component mounts
  // useEffect(() => {
  //   fetch('http://localhost:3000/api/analysis') // API does not exists yet, to be created in task 2!
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setData(data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       setError(error.message);
  //       setLoading(false);
  //     });
  // }, []);

  // Conditional rendering based on loading state and error
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="data-container">
      <h2>Resume Analysis - in development sprint 2</h2>
      <div className="data-card">
        <div className="data-item">
          <strong>Formatting tips:</strong> {data.id}
        </div>
        <div className="data-item">
          <strong>Experience:</strong> {data.name}
        </div>
        <div className="data-item">
          <strong>Skills:</strong> {data.age}
        </div>
        <div className="data-item">
          <strong>Job Description Matching:</strong> {data.email}
        </div>
        <div className="data-item">
          <strong>Language/Grammar tips:</strong> {data.location}
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;
