import React, { useState } from 'react';
import { calculateFitScore } from '../../api/fitscore';

const ImprovementSuggestions = () => {
  const [improvementSuggestions, setImprovementSuggestions] = useState([]);
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(false); 

  const handleFetchSuggestions = async () => {
    setError(null); 
    setImprovementSuggestions([]); 
    setLoading(true);

    try {
      const result = await calculateFitScore();
      if (result.feedback) {
        setImprovementSuggestions(result.feedback);
      } else {
        setImprovementSuggestions([]);
        setError('No improvement suggestions available.');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while fetching improvement suggestions.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button onClick={handleFetchSuggestions} disabled={loading}>
        {loading ? 'Fetching...' : 'Fetch Improvement Suggestions'}
      </button>

      {improvementSuggestions.length > 0 ? (
        <ul>
          {improvementSuggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      ) : (
        !loading && !error && <p>No improvement suggestions to display.</p>
      )}
    </div>
  );
};

export default ImprovementSuggestions;
