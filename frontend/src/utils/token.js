// Get the token from localStorage
export const getToken = () => {
  try {
    const token = localStorage.getItem('authToken');
    return token ? token : null;
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

// Check if the token is valid based on expiry time
export const isTokenValid = () => {
  try {
    const expiryTime = localStorage.getItem('authTokenExpiry');
    if (!expiryTime) return false;

    return new Date().getTime() < parseInt(expiryTime, 10);
  } catch (error) {
    console.error('Error validating token:', error);
    return false;
  }
};

// Clear the token and expiry time from localStorage
export const clearToken = () => {
  try {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authTokenExpiry');
    console.log('Token cleared successfully.');
  } catch (error) {
    console.error('Error clearing token:', error);
  }
};

// Save the token and its expiry time to localStorage
export const saveToken = (token, expiryTime) => {
  try {
    localStorage.setItem('authToken', token);
    localStorage.setItem('authTokenExpiry', expiryTime.toString());
    console.log('Token saved successfully.');
  } catch (error) {
    console.error('Error saving token:', error);
  }
};
