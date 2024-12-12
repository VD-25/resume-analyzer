import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/';


export const storeData = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/store-data`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to store data');
  }
};
