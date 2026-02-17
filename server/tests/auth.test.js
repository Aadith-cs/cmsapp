const request = require('supertest');
const { app, server } = require('../server');
const mongoose = require('mongoose');
const User = require('../models/User');

describe('Auth API', () => {
    beforeAll(async () => {
        // Connect to a test database or clear the existing one
        // For simplicity in this environment, we might rely on the main simple DB 
        // but ideally we should use a test DB.
        // Let's just create a unique user for testing.
    });

    afterAll(async () => {
        await User.findOneAndDelete({ email: 'test@example.com' });
        await mongoose.connection.close();
        server.close();
    });

    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                password: 'password123',
                email: 'test@example.com', // Assuming email schema exists or we add it, wait Model only has username
                // Checking User Model... it only has username, password, role.
                // Let's use a unique username
            });

        // Adjusting to actual User model
    });
});

// Re-writing content to be actual implementation
const uniqueId = Date.now();
const testUser = {
    username: `testuser_${uniqueId}`,
    password: 'password123'
};

describe('Auth Endpoints', () => {
    afterAll(async () => {
        await User.findOneAndDelete({ username: testUser.username });
        await mongoose.connection.close();
        server.close();
    });

    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send(testUser);

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('token');
    });

    it('should login the user', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send(testUser);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });

    it('should fail login with wrong password', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                username: testUser.username,
                password: 'wrongpassword'
            });

        expect(res.statusCode).toEqual(401);
    });
});
