const { Sequelize } = require("sequelize");

// Конфигурация для разных окружений
let sequelize;

if (process.env.NODE_ENV === "production") {
  // Для продакшена (Vercel) используем in-memory базу для тестирования
  sequelize = new Sequelize("sqlite::memory:", {
    dialect: "sqlite",
    logging: false,
  });
} else {
  // Для локальной разработки используем SQLite
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite",
  });
}

module.exports = sequelize;
