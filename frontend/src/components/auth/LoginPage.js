import React, { useState } from 'react';
import "../../styles/styles.css";
import Spinner from '../shared/Spinner';
import { login } from '../../api/auth'; // Import the reusable API function for login
import { saveToken } from '../../utils/token';

const LoginPage = ({ onLoginSuccess }) => {
  // Define state for form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Call the login API function
      const { token } = await login(email, password);
  
      // Decode the token to extract the expiry time
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiryTime = payload.exp * 1000; // Convert to milliseconds
  
      // Save the token and expiry time using the utility
      saveToken(token, expiryTime);
  
      // Notify parent component about successful login
      onLoginSuccess(true);
  
      // Clear form fields
      setEmail('');
      setPassword('');
      setError('');
    } catch (err) {
      console.error('Login error:', err);
      setError(err || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="form-container">
        {error && <p className="error-message">{error}</p>}
        <h2>Login</h2>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        {loading && <Spinner />}
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
