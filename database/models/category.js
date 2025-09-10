const sequelize = require('../database');
const { DataTypes } = require("sequelize");
const { Sequelize } = require('sequelize');

const Category = sequelize.define("category", {
    id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.TEXT,
    image: DataTypes.TEXT,
});



module.exports = Category;