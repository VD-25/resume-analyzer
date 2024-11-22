import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
  // Define state for form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    // Prepare login data
    const loginData = {
      email,
      password,
    };

    setLoading(true);

    try {
      // Send login data to backend
      const response = await axios.post('http://localhost:3000/api/login', loginData);
      
      // Handle success (e.g., store token or redirect)
      console.log('Login successful:', response.data);

      // Reset form and error state on success
      setEmail('');
      setPassword('');
      setError('');
      // Redirect or store token logic here
    } catch (err) {
      // Handle error (e.g., wrong credentials)
      console.error('Login error:', err.response ? err.response.data : err.message);
      setError('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;