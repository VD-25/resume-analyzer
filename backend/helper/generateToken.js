const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env' });

const JWT_SECRET = process.env.JWT_SECRET; 
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined. Please set it in the .env file.");
}

function generateToken(email) {
    const payload = { email };
    const options = { expiresIn: '1h' };  // Token expires in 1 hour
    const token = jwt.sign(payload, JWT_SECRET, options);
    return token;
}

module.exports = generateToken;