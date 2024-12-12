import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'

// Resume upload
export const uploadResume = async (file) => {
  try {
    const formData = new FormData();
    formData.append('resume_file', file);

    const response = await axios.post(`${API_BASE_URL}/resume-upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;

  } catch (error) {
    throw error.response?.data?.error || 'Failed to upload resume.';
  }
};



// Resume analysis
export const analyzeResume = async (resumeId, token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/resume-analysis/${resumeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Failed to analyze resume.';
  }
};
