const { Sequelize } = require("sequelize");

// Конфигурация для разных окружений
let sequelize;

if (process.env.NODE_ENV === "production") {
  // Для продакшена (Vercel) используем PostgreSQL
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is required for production");
  }
  
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
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
