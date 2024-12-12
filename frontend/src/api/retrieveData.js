import axios from 'axios';
import { getToken, isTokenValid, clearToken } from '../utils/token'; 

const API_BASE_URL = 'http://localhost:3000/api';

export const retrieveData = async (sessionId) => {
  try {
    // Validate the token
    if (!isTokenValid()) {
      clearToken();
      throw new Error('Token is invalid or expired. Please log in again.');
    }

    // Retrieve the token
    const token = getToken();
    if (!token) {
      throw new Error('No authentication token found. Please log in.');
    }

    // Make the API call to retrieve data
    const response = await axios.get(`${API_BASE_URL}/retrieve-data`, {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        sessionId, 
      },
    });

    return response.data; 
  } catch (error) {
    console.error('Error retrieving data:', error);
    throw error.response?.data?.error || 'Failed to retrieve data.';
  }
};
