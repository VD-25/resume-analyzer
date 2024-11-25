const jwt = require('jsonwebtoken');
const verifyToken = require('../helper/verifyToken.js');

const JWT_SECRET = process.env.JWT_SECRET; 

const validToken = jwt.sign({ email: 'test@example.com' }, JWT_SECRET, { expiresIn: '1h' });
const expiredToken = jwt.sign({ email: 'test@example.com' }, JWT_SECRET, { expiresIn: '-1h' });
const invalidToken = 'invalid.token.string';

describe("verifyToken", () => {
    test("should return decoded payload for a valid token", () => {
        const result = verifyToken(validToken);
        expect(result).toHaveProperty('email', 'test@example.com');
        expect(result).toHaveProperty('iat'); // issued at timestamp
        expect(result).toHaveProperty('exp'); // expiration timestamp
    });

    test("should return null for an expired token", () => {
        const result = verifyToken(expiredToken);
        expect(result).toBeNull();
    });

    test("should return null for an invalid token", () => {
        const result = verifyToken(invalidToken);
        expect(result).toBeNull();
    });
});
