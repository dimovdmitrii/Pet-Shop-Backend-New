const sequelize = require('../database');
const { DataTypes } = require("sequelize");
const { Sequelize } = require('sequelize');

const Product = sequelize.define("product", {
    id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.TEXT,
    price: DataTypes.DECIMAL(10, 2),
    oldPrice: DataTypes.DECIMAL(10, 2),
    description: DataTypes.TEXT,
    image: DataTypes.TEXT,
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'categories',
            key: 'id'
        }
    },
    isNew: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isSale: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});



module.exports = Product;