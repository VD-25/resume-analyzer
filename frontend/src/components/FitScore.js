import React, { useEffect, useState } from 'react';

const FitScore = () => {
  const [fitScore, setFitScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const jobDescription = "Example job description text here...";
    const resume = "Example resume text here...";

    const fetchFitScore = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:3000/api/fit-score', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ job_description: jobDescription, resume_text: resume }),  // Match the expected parameters
        });

        if (!response.ok) {
          throw new Error('Failed to fetch fit score');
        }

        const data = await response.json();
        setFitScore(data.fit_score);  // Ensure this matches the response field
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFitScore();
  }, []);

  if (loading) return <p>Loading Fit Score...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h3>Fit Score</h3>
      {fitScore !== null ? <p>Your Fit Score is: {fitScore}</p> : <p>Unable to calculate fit score.</p>}
    </div>
  );
};

export default FitScore;
