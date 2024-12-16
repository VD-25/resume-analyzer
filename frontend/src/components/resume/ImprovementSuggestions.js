import React, { useState, useEffect } from 'react';

const ImprovementSuggestions = ({ feedback, loading }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (feedback && feedback.suggestions) {
      setSuggestions(feedback.suggestions);
    } else {
      setSuggestions([]);
    }
  }, [feedback]);

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