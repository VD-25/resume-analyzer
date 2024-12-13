import axios from 'axios';
import { getToken, isTokenValid, clearToken } from '../utils/token';

const API_BASE_URL = 'http://localhost:3000/api';

export const calculateFitScore = async () => {
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

    if (!retrievedData || !retrievedData.extractTextFromPdf || !retrievedData.jobDescription) {
      throw new Error('Invalid or incomplete data retrieved for the session.');
    }

    const requestBody = {
      resume_text: retrievedData.extractTextFromPdf,
      job_description: retrievedData.jobDescription,
    };
    console.log('Request body for fit-score API:', requestBody);

    const fitScoreResponse = await axios.post(
      `${API_BASE_URL}/fit-score`,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return fitScoreResponse.data;
  } catch (error) {
    console.error('Error calculating fit score:', error);
    throw error.response?.data?.error || 'Failed to calculate fit score.';
  }
};
