const jwt = require('jsonwebtoken');
const generateToken = require("../helper/generateToken.js");

// process.env.JWT_SECRET = "testsecret";

describe('generateToken', () => {
    test('should generate a valid JWT token', () => {
        const JWT_SECRET = process.env.JWT_SECRET;
        const email = 'test@example.com';
        const token = generateToken(email);

        const decoded = jwt.verify(token, JWT_SECRET);
        expect(decoded).toHaveProperty('email', email);
        expect(decoded).toHaveProperty('iat'); // issued at timestamp
        expect(decoded).toHaveProperty('exp'); // expiration timestamp
    });

    test("should set expiration to 1 hour", () => {
        const email = 'test@example.com';
        const token = generateToken(email);
        const JWT_SECRET = process.env.JWT_SECRET;
        
        const decoded = jwt.verify(token, JWT_SECRET);
        const expTime = decoded.exp - decoded.iat; // expiration time minus issued time

        expect(expTime).toBe(3600);  // 1 hour in seconds
    });
});
