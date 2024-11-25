import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

const SignUp = () => {
  // State for form fields and submission status
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false); // Track submission state

  // Handlers for input changes
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // Start loading when form is submitted
    setError('');
    setSuccess('');

    // Prepare the form data object
    const formData = { email, username, password };

    try {
      // Send the data to the backend using Axios
      const response = await axios.post('http://localhost:3000/api/register', formData);
      setSuccess(response.data.message);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
      setSuccess('');
    } finally {
      setLoading(false); // Stop loading after submission is complete
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-container">
        {success && <p style={{ color: 'green' }}>{success}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div>
          <h2>Sign Up</h2>

          <label htmlFor="Username">Username</label>
          <input
            type="text"
            id="Username"
            className="input-field"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>

        <div>
          <label htmlFor="Email">Email</label>
          <input
            type="email"
            id="Email"
            className="input-field"
            value={email}
            onChange={handleEmailChange}
          />
        </div>

        <div>
          <label htmlFor="Password">Password</label>
          <input
            type="password"
            id="Password"
            className="input-field"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        <button
          type="submit"
          className="submit-btn"
          disabled={loading} // Disable button while submitting
        >
          {loading ? 'Submitting...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default SignUp;