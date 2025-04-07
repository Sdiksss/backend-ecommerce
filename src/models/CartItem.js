const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const CartItem = sequelize.define('cartItem', {
    quantity: {
        type: DataTypes.STRING,
        allowNull: false
    },
    //userId
    //productId
});

module.exports = CartItem;