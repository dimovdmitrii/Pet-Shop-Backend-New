const { Sequelize } = require("sequelize");

// Конфигурация для разных окружений
let sequelize;

if (process.env.NODE_ENV === "production") {
  // Для продакшена (Vercel) используем PostgreSQL
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
  });
} else {
  // Для локальной разработки используем SQLite
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite",
    logging: false,
  });
}

module.exports = sequelize;
