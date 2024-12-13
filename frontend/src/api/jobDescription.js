import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export const getJobDescriptions = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/job-description`);
    return response.data; 
  } catch (error) {
    throw error.response?.data?.error || 'Failed to fetch job descriptions.';
  }
};

export const submitJobDescription = async (text) => {
  try {
    const payload = { job_description: text };

    // Send the POST request with the job description as JSON
    const response = await axios.post(`${API_BASE_URL}/job-description`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return response.data; 

  } catch (error) {
    throw error.response?.data?.error || 'Failed to submit job description.';
  }
};



