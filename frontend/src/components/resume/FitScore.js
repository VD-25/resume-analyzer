import React, { useState } from 'react';
import { calculateFitScore } from '../../api/fitscore';

const FitScoreComponent = () => {
  const [fitScore, setFitScore] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCalculateFitScore = async () => {
    setError(null);
    setFitScore(null); 
    setLoading(true);

    try {
      const result = await calculateFitScore();
      setFitScore(result.fit_score);
    } catch (err) {
      setError(err.message || 'An error occurred while calculating the fit score.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button onClick={handleCalculateFitScore} disabled={loading}>
        {loading ? 'Calculating...' : 'Calculate Fit Score'}
      </button>

      {fitScore !== null && (
        <div>
          <h3>Fit Score: {fitScore}%</h3>
        </div>
      )}
    </div>
  );
};

export default FitScoreComponent;
