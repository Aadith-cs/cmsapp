const express = require('express');
const router = express.Router();
const {
    getMenuItems,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
} = require('../controllers/menuController');
const { updateStock } = require('../controllers/stockController');
const { protect, admin } = require('../middlewares/authMiddleware');

router.route('/').get(getMenuItems).post(protect, admin, createMenuItem);
router
    .route('/:id')
    .put(protect, admin, updateMenuItem)
    .delete(protect, admin, deleteMenuItem);

router.put('/:id/stock', protect, admin, updateStock);

module.exports = router;
