import React, { useState } from 'react';
import axios from 'axios';
import "./styles.css"
import Spinner from './Spinner';

const LoginPage = ({onLoginSuccess}) => {
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
      onLoginSuccess(true);
      console.log('Login successful:', response.data);
      // alert('Login successful:', response.data);

      // Reset form and error state on success
      setEmail('');
      setPassword('');
      setError('Success!');
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
    <div class="center" className="login-container">
      
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
            required
          />
        </div>
        {loading && <Spinner />}
        <button type="submit" className='submit-btn' disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;