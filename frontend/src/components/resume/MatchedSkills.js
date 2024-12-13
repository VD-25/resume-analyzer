import React, { useState, useEffect } from 'react';
import { calculateFitScore } from '../../api/fitscore';

const MatchedSkills = ({ loading }) => {
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (loading) {
      handleFetchMatchedSkills(); 
    }
  }, [loading]);

  const handleFetchMatchedSkills = async () => {
    setError(null);
    setSkills([]); 

    try {
      const result = await calculateFitScore(); 
      setSkills(result.matched || []);
    } catch (err) {
      setError(err.message || 'An error occurred while fetching matched skills.');
    }
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading ? (
        <p>Loading Matched Skills...</p>
      ) : (
        <ul>
          {skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MatchedSkills;
