const express = require('express');
const { registerHandler, loginHandler, protectedHandler } = require('../controller/userAuthController');

const router = express.Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [User Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *               username:
 *                 type: string
 *                 description: The user's username
 *               password:
 *                 type: string
 *                 description: The user's password
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Email already in use
 */
router.post('/register', registerHandler);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login an existing user
 *     tags: [User Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *               password:
 *                 type: string
 *                 description: The user's password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The JWT token
 *       400:
 *         description: Missing email or password
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', loginHandler);

/**
 * @swagger
 * /protected:
 *   get:
 *     summary: Access a protected route
 *     tags: [User Authentication]
 *     responses:
 *       200:
 *         description: Access granted
 *       401:
 *         description: Invalid or expired token
 */
router.get('/protected', protectedHandler);

module.exports = router;
