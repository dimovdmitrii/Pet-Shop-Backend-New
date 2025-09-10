// Тест подключения к Neon PostgreSQL
const { neon } = require('@neondatabase/serverless');

async function testNeonConnection() {
  console.log('🔍 Тестируем подключение к Neon PostgreSQL...');
  
  // Проверяем переменную окружения
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL не найдена в переменных окружения');
    console.log('💡 Убедитесь, что переменная DATABASE_URL настроена в Vercel');
    return;
  }
  
  console.log('✅ DATABASE_URL найдена');
  console.log('🔗 URL:', process.env.DATABASE_URL.substring(0, 20) + '...');
  
  try {
    // Создаем подключение
    const sql = neon(process.env.DATABASE_URL);
    console.log('✅ Neon клиент создан');
    
    // Тестируем простое подключение
    const result = await sql`SELECT NOW() as current_time`;
    console.log('✅ Подключение к базе данных успешно!');
    console.log('🕐 Время сервера:', result[0].current_time);
    
    // Проверяем таблицы
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    console.log('📋 Найденные таблицы:', tables.map(t => t.table_name));
    
    // Проверяем данные в таблицах
    if (tables.some(t => t.table_name === 'categories')) {
      const categoryCount = await sql`SELECT COUNT(*) FROM categories`;
      console.log('📊 Количество категорий:', categoryCount[0].count);
    }
    
    if (tables.some(t => t.table_name === 'products')) {
      const productCount = await sql`SELECT COUNT(*) FROM products`;
      console.log('📊 Количество продуктов:', productCount[0].count);
    }
    
    console.log('🎉 Все тесты прошли успешно!');
    
  } catch (error) {
    console.error('❌ Ошибка подключения к Neon:', error.message);
    console.error('🔍 Детали ошибки:', error);
  }
}

// Запускаем тест
testNeonConnection();
