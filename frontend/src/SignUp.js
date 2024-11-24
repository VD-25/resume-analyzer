import React, { useState } from 'react';
import axios from 'axios';
import "./styles.css"


const SignUp = () => {
  // Separate useState hooks for each input field
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handlers for input changes
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the form data object to send in the POST request
    const formData = { email, username, password };

    try {
      // Send the data to the backend using Axios
      const response = await axios.post('http://localhost:3000/api/register', formData);
      setSuccess(response.data.message);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
      setSuccess('');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-container">
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
        <div>
        <h2>Sign Up</h2>
          <label>Username</label>
          <input
            type="text"
            className="input-field"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            className="input-field"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            className="input-field"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit" className='submit-btn'>Sign Up</button>
      </form>

      
    </div>
  );
};

export default SignUp;