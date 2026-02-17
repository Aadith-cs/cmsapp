const Menu = require('../models/Menu');

// @desc    Update stock level
// @route   PUT /api/menu/:id/stock
// @access  Private/Admin
const updateStock = async (req, res) => {
    const { stockLevel } = req.body;

    try {
        const menuItem = await Menu.findById(req.params.id);

        if (menuItem) {
            menuItem.stockLevel = stockLevel;
            // Auto-update availability based on stock
            if (stockLevel === 0) {
                menuItem.available = false;
            } else {
                menuItem.available = true;
            }

            const updatedMenuItem = await menuItem.save();
            res.json(updatedMenuItem);
        } else {
            res.status(404).json({ message: 'Menu item not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { updateStock };
