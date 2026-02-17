const request = require('supertest');
const { app, server } = require('../server');
const mongoose = require('mongoose');
const Order = require('../models/Order');

describe('Order Endpoints', () => {
    afterAll(async () => {
        await mongoose.connection.close();
        server.close();
    });

    it('should create a new order', async () => {
        const orderData = {
            items: [
                {
                    menuItem: new mongoose.Types.ObjectId(), // Mock ID
                    name: 'Test Item',
                    price: 50,
                    qty: 2
                }
            ],
            totalAmount: 100
        };

        const res = await request(app)
            .post('/api/order/create')
            .send(orderData);

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('orderId');
        expect(res.body).toHaveProperty('qrCode');
    });
});
