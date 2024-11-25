const request = require('supertest');
const express = require("express");
const userSignUp = require("../userSignUp");

const app = express();
app.use(express.json());
app.use("/api", userSignUp); // Ensure the routes are mounted

describe('POST api/login', () => {
  beforeAll(async () => {
    // Register a user for testing
    await request(app)
      .post('/api/register')
      .send({
        email: 'user@example.com',
        username: 'testuser',
        password: 'securePassword',
      });
  });

  it('should log in successfully with correct credentials', async () => {
    const response = await request(app).post('/api/login').send({
      email: 'user@example.com',
      password: 'securePassword',
    });
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it('should fail login with incorrect password', async () => {
    const response = await request(app).post('/api/login').send({
      email: 'user@example.com',
      password: 'wrongPassword',
    });
    expect(response.status).toBe(401);  // Unauthorized
  });

  it('should fail login with non-existent email', async () => {
    const response = await request(app).post('/api/login').send({
      email: 'nonexistent@example.com',
      password: 'somePassword',
    });
    expect(response.status).toBe(401);  // Invalid credentials
  });

  it('should fail login when email is missing', async () => {
    const response = await request(app).post('/api/login').send({
      password: 'securePassword',
    });
    expect(response.status).toBe(400);  // Bad Request
    expect(response.body.error).toBe('Email and password are required');
  });

  it('should fail login when password is missing', async () => {
    const response = await request(app).post('/api/login').send({
      email: 'user@example.com',
    });
    expect(response.status).toBe(400);  // Bad Request
    expect(response.body.error).toBe('Email and password are required');
  });

  it('should fail login with SQL injection attempt in email', async () => {
    const response = await request(app).post('/api/login').send({
      email: 'user@example.com\' OR 1=1 --',  // SQL Injection attempt
      password: 'securePassword',
    });
    expect(response.status).toBe(401);  // Unauthorized
  });

  it('should return a valid JWT token', async () => {
    const response = await request(app).post('/api/login').send({
      email: 'user@example.com',
      password: 'securePassword',
    });
    expect(response.body.token).toMatch(/^[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+$/);  // Valid JWT format
  });
});
