import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

// User signup
export const signup = async (email, username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, { email, username, password });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Signup failed.';
  }
};

// User login
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
    return response.data; 
  } catch (error) {
    throw error.response?.data?.error || 'Login failed.';
  }
};
