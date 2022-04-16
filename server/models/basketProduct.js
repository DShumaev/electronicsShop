const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const BasketProduct = sequelize.define('basketProduct', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
});

module.exports = BasketProduct;
