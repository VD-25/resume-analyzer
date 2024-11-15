require('dotenv').config({ path: './backend/.env' });
//require('dotenv').config();  // Make sure to load .env for the test environment

const jwt = require('jsonwebtoken');

//const JWT_SECRET = process.env.JWT_SECRET;
const JWT_SECRET = 'f7c9a8d5a13db5f9eb5f4f2872c9a158f0a6bc6fe3bf2d45c0c1a52f1b6c8bc'


if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined. Please set it in the .env file.");
}

// Function to generate JWT token
function generateToken(email) {
  const payload = { email };
  const options = { expiresIn: '1h' };  // Token expires in 1 hour
  const token = jwt.sign(payload, JWT_SECRET, options);
  return token;
}

// Function to verify JWT token
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (err) {
    return null;  // Invalid token
  }
}

module.exports = {
  generateToken,
  verifyToken
};