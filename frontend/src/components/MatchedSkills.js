import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MatchedSkills = () => {
  const [matchedSkills, setMatchedSkills] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/analyze-application')
      .then((response) => setMatchedSkills(response.data.skills || []))
      .catch((error) => {
        console.error('Error fetching matched skills:', error);
        setMatchedSkills([]); // Set to an empty array on error
      });
  }, []);

  return (
    <div>
      <h3>Matched Skills</h3>
      <ul>
        {matchedSkills.length > 0 ? (
          matchedSkills.map((skill, index) => <li key={index}>{skill}</li>)
        ) : (
          <li>Loading..</li>
        )}
      </ul>
    </div>
  );
};

export default MatchedSkills;
