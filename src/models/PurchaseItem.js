// models/PurchaseItem.js
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const PurchaseItem = sequelize.define('purchaseItem', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending'
    },
});

module.exports = PurchaseItem;
