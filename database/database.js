const { Sequelize } = require("sequelize");

// Временно отключаем базу данных для тестирования
const sequelize = new Sequelize("sqlite::memory:", {
  dialect: "sqlite",
  logging: false,
});

module.exports = sequelize;
