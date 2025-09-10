// Файл для тестирования подключения к Neon PostgreSQL
const { Sequelize } = require('sequelize');

async function testNeonConnection() {
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL не установлен');
    return;
  }

  console.log('🔍 Тестирование подключения к Neon PostgreSQL...');
  console.log('DATABASE_URL:', process.env.DATABASE_URL.substring(0, 20) + '...');

  try {
    const sequelize = new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      logging: console.log,
    });

    // Тестируем подключение
    await sequelize.authenticate();
    console.log('✅ Подключение к Neon PostgreSQL успешно!');

    // Тестируем простой запрос
    const result = await sequelize.query('SELECT NOW() as current_time');
    console.log('✅ Запрос выполнен успешно:', result[0][0]);

    await sequelize.close();
    console.log('✅ Подключение закрыто');

  } catch (error) {
    console.error('❌ Ошибка подключения к Neon PostgreSQL:', error.message);
    console.error('Полная ошибка:', error);
  }
}

// Запускаем тест только если это основной файл
if (require.main === module) {
  testNeonConnection();
}

module.exports = testNeonConnection;
