const bcrypt = require('bcrypt');
const generateToken = require('../helper/generateToken');
const verifyToken = require('../helper/verifyToken');

const users = {};

const registerHandler = async (req, res) => {
  const { email, username, password } = req.body;

  if (users[email]) {
    return res.status(400).json({ error: 'Email is already in use' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users[email] = {
    username,
    hashedPassword,
  };

  return res.status(201).json({ message: 'User registered successfully' });
};

const loginHandler = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const user = users[email];
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
  if (!isPasswordValid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = generateToken(email);
  return res.json({ token });
};

const protectedHandler = (req, res) => {
  const token = req.header('Authorization')?.split(' ')[1];

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  return res.json({ message: `Welcome, ${decoded.email}` });
};

module.exports = { registerHandler, loginHandler, protectedHandler };
