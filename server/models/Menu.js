const mongoose = require('mongoose');

const menuSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String, // URL to image
        required: false
    },
    stockLevel: {
        type: Number,
        required: true,
        default: 0
    },
    available: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;
