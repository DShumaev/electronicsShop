const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const TypeBrand = sequelize.define('deviceTypeBrand', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
});

module.exports = TypeBrand;
