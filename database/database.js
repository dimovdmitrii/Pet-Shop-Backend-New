const { Sequelize } = require("sequelize");

// Конфигурация для разных окружений
let sequelize;

if (process.env.NODE_ENV === "production") {
  // Для продакшена (Vercel) используем PostgreSQL
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL environment variable is required for production");
    throw new Error("DATABASE_URL environment variable is required for production");
  }
  
  console.log("Connecting to PostgreSQL database...");
  
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
    },
    retry: {
      match: [
        /ETIMEDOUT/,
        /EHOSTUNREACH/,
        /ECONNRESET/,
        /ECONNREFUSED/,
        /ETIMEDOUT/,
        /ESOCKETTIMEDOUT/,
        /EHOSTUNREACH/,
        /EPIPE/,
        /EAI_AGAIN/,
        /SequelizeConnectionError/,
        /SequelizeConnectionRefusedError/,
        /SequelizeHostNotFoundError/,
        /SequelizeHostNotReachableError/,
        /SequelizeInvalidConnectionError/,
        /SequelizeConnectionTimedOutError/
      ],
      max: 3
    }
  });
} else {
  // Для локальной разработки используем SQLite
  console.log("Connecting to SQLite database...");
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite",
    logging: false,
  });
}

module.exports = sequelize;
