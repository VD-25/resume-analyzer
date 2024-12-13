import React, { useState } from 'react';
import { signup } from '../../api/auth'; // Import the signup API function
import '../../styles/styles.css';
import Spinner from '../shared/Spinner';

const SignUp = () => {
  // State for form fields and submission status
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Handlers for input changes
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Validate input fields
  const validateInputs = () => {
    if (!username.trim() || !email.trim() || !password.trim()) {
      setError('All fields are required.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email format.');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs before submitting
    if (!validateInputs()) return;

    setLoading(true); // Start loading when form is submitted
    setError('');
    setSuccess('');

    try {
      // Call the signup API function
      const response = await signup(email, username, password);
      setSuccess(response.message); // Assuming backend returns a success message
      setError('');
      setUsername(''); // Clear fields on success
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err || 'Something went wrong. Please try again.'); // Handle API error
      setSuccess('');
    } finally {
      setLoading(false); // Stop loading after submission is complete
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-container">
        {success && <p className="success-message">{success}</p>}
        {error && <p className="error-message">{error}</p>}

        <div>
          <h2>Sign Up</h2>

          <label htmlFor="Username">Username</label>
          <input
            type="text"
            id="Username"
            className="input-field"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Enter your username"
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
            placeholder="Enter your email"
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
            placeholder="Enter your password"
          />
        </div>
        {loading && <Spinner />}
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
