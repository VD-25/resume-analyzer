const express = require('express');
const bcrypt = require('bcrypt');
const generateToken = require('./helper/generateToken');
const verifyToken = require("./helper/verifyToken");

const app = express();
app.use(express.json());

// In-memory storage
const users = {};

// Endpoint: User Registration
app.post('/api/register', async (req, res) => {
  const { email, username, password } = req.body;

  // Check if email is already in use
  if (users[email]) {
    return res.status(400).json({ error: 'Email is already in use' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  users[email] = {
    username,
    hashedPassword,
  };

  return res.status(201).json({ message: 'User registered successfully' });
});

// Endpoint: User Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  // Check if both email and password are provided
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Check if user exists
  const user = users[email];
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Check if password is correct
  const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
  if (!isPasswordValid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Generate a JWT token for the user
  const token = generateToken(email);

  // Respond with the token
  return res.json({ token });
});


// Endpoint: Protected Route
app.get('/api/protected', (req, res) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Get the token from Authorization header

  // Check if the token is valid
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  return res.json({ message: `Welcome, ${decoded.email}` });
});

// Export the app (no app.listen here for tests)
module.exports = app;
