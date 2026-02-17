const request = require('supertest');
const { app, server } = require('../server');
const mongoose = require('mongoose');
const Menu = require('../models/Menu');
const User = require('../models/User');

let token;

describe('Menu Endpoints', () => {
    beforeAll(async () => {
        // Create an admin user to get token
        const adminUser = {
            username: `admin_${Date.now()}`,
            password: 'password123',
            role: 'admin'
        };

        // Register admin
        await request(app).post('/api/auth/register').send(adminUser);

        // Login to get token
        const res = await request(app).post('/api/auth/login').send(adminUser);
        token = res.body.token;
    });

    afterAll(async () => {
        // Cleanup
        await Menu.deleteMany({ name: /Test Menu Item/ });
        await User.deleteMany({ username: /admin_/ });
        await mongoose.connection.close();
        server.close();
    });

    it('should create a new menu item (Admin only)', async () => {
        const res = await request(app)
            .post('/api/menu')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: `Test Menu Item ${Date.now()}`,
                price: 100,
                category: 'Test',
                image: 'http://example.com/image.png',
                stockLevel: 10,
                available: true
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('name');
    });

    it('should fetch all menu items', async () => {
        const res = await request(app)
            .get('/api/menu');

        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});
