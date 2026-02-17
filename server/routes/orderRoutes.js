const express = require('express');
const router = express.Router();
const {
    createOrder,
    payOrder,
    getOrderById,
} = require('../controllers/orderController');

router.post('/create', createOrder);
router.post('/pay', payOrder);
router.get('/:id', getOrderById);

module.exports = router;
