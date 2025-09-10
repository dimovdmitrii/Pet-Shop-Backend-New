const { Sequelize } = require('sequelize');

// Конфигурация для разных окружений
let sequelize;

if (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL) {
  // Для продакшена (Vercel) используем PostgreSQL или другую облачную БД
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false
  });
} else {
  // Для локальной разработки используем SQLite
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
  });
}

module.exports = sequelize;