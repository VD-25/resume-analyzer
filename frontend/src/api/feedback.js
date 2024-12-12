import axios from 'axios';
import { getToken, isTokenValid, clearToken } from '../utils/token';

const API_BASE_URL = 'http://localhost:3000/api';

// Generate feedback for a resume
export const generateFeedback = async (jobDescription) => {
  try {
    if (!isTokenValid()) {
      clearToken();
      throw new Error('Token is invalid or expired. Please log in again.');
    }

    const sessionId = getToken();
    if (!sessionId) {
      throw new Error('No authentication token found. Please log in.');
    }

    const retrieveResponse = await axios.get(`${API_BASE_URL}/retrieve-data`, {
      headers: {
        'Content-Type': 'application/json',
      },
      params: { sessionId },
    });

    const retrievedData = retrieveResponse.data?.data;
    console.log('Data retrieved from retrieveData:', retrievedData);

    if (!retrievedData || !retrievedData.extractTextFromPdf) {
      throw new Error('Resume data not found or is incomplete.');
    }

    const response = await axios.post(
      `${API_BASE_URL}/generate-feedback`,
      {
        resume_text: retrievedData.extractTextFromPdf, 
        job_description: jobDescription, 
      },
      {
        headers: {
          'Content-Type': 'application/json', 
        },
      }
    );
    console.log('Generated FeedBack:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error generating feedback:', error);
    throw error.response?.data?.error || 'Failed to generate feedback.';
  }
};
