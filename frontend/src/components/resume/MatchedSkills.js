import React, { useState } from 'react';
import { calculateFitScore } from '../../api/fitscore';

const MatchedSkills = () => {
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); 

  const handleFetchMatchedSkills = async () => {
    setError(null);
    setSkills([]);
    setLoading(true);

    try {
      const result = await calculateFitScore();
      console.log(result);
      setSkills(result.matched || []);
    } catch (err) {
      setError(err.message || 'An error occurred while fetching matched skills.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button onClick={handleFetchMatchedSkills} disabled={loading}>
        {loading ? 'Fetching...' : 'Fetch Matched Skills'}
      </button>

      {skills.length > 0 ? (
        <ul>
          {skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      ) : (
        !loading && <p>No matched skills to display.</p>
      )}
    </div>
  );
};

export default MatchedSkills;
