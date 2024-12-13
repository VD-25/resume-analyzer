import React, { useState, useEffect } from 'react';
import { generateFeedback } from '../../api/feedback';

const ImprovementSuggestions = ({ loading }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (loading) {
      handleGenerateSuggestions(); 
    }
  }, [loading]);

  const handleGenerateSuggestions = async () => {
    setError(null);
    setSuggestions([]);
    try {
      const result = await generateFeedback(""); 
      setSuggestions(result.suggestions || []);
      console.log(result.feedback);
    } catch (err) {
      setError(err.message || 'An error occurred while fetching improvement suggestions.');
    }
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading ? (
        <p>Loading Improvement Suggestions...</p>
      ) : (
        <ul>
          {suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ImprovementSuggestions;