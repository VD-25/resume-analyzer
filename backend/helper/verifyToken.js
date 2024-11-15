const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env' });

const JWT_SECRET = process.env.JWT_SECRET; 
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined. Please set it in the .env file.");
}

function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (err) {
        return null; // Invalid token
    }
}

module.exports = verifyToken;