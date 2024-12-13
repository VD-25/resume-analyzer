import React, { useState, useEffect } from 'react';
import { calculateFitScore } from '../../api/fitscore';
import ProgressBar from 'react-progressbar';

const FitScoreComponent = ({ loading }) => {
  const [fitScore, setFitScore] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (loading) {
      handleCalculateFitScore();  // Automatically triggers when loading is true
    }
  }, [loading]);

  const handleCalculateFitScore = async () => {
    setError(null);
    setFitScore(null); 

    try {
      const result = await calculateFitScore();
      setFitScore(result.fit_score);
    } catch (err) {
      setError(err.message || 'An error occurred while calculating the fit score.');
    }
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {loading ? (
        <p>Loading Fit Score...</p>
      ) : (
        <>
          {fitScore !== null && (
            <div>
              <h3>Fit Score: {fitScore}%</h3>
              <ProgressBar completed={fitScore} max={100} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FitScoreComponent;
