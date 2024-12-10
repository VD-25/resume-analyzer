import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ImprovementSuggestions = () => {
  const [improvementSuggestions, setImprovementSuggestions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/generate-feedback')
      .then((response) => setImprovementSuggestions(response.data.suggestions || []))
      .catch((error) => {
        console.error('Error fetching improvement suggestions:', error);
        setImprovementSuggestions([]); // Set to an empty array on error
      });
  }, []);

  return (
    <div>
      <h3>Improvement Suggestions</h3>
      <ul>
        {improvementSuggestions.length > 0 ? (
          improvementSuggestions.map((suggestion, index) => <li key={index}>{suggestion}</li>)
        ) : (
          <li>Loading...</li>
        )}
      </ul>
    </div>
  );
};

export default ImprovementSuggestions;
