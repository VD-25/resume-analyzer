import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/';

// Function to fetch user data
export const getUserData = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Failed to fetch user data.';
  }
};
