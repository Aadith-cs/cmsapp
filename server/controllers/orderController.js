const Order = require('../models/Order');
const Menu = require('../models/Menu');
const { generateQR } = require('../services/qrService');

// @desc    Create new order
// @route   POST /api/order/create
// @access  Public
const createOrder = async (req, res) => {
    const { items, totalAmount } = req.body;

    if (items && items.length === 0) {
        res.status(400);
        throw new Error('No order items');
        return;
    }

    try {
        // Generate simple Order ID
        const orderId = `ORD-${Date.now()}`;

        // Generate QR Code
        const qrCode = await generateQR(orderId);

        const order = new Order({
            orderId,
            items,
            totalAmount,
            qrCode,
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update order to paid
// @route   POST /api/order/pay
// @access  Public
const payOrder = async (req, res) => {
    const { orderId } = req.body;

    try {
        const order = await Order.findOne({ orderId });

        if (order) {
            order.paymentStatus = 'paid';
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get order by ID
// @route   GET /api/order/:id
// @access  Public
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate(
            'items.menuItem',
            'name price image'
        );

        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { createOrder, payOrder, getOrderById };
