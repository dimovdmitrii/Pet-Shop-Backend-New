// Проверка структуры таблиц в Neon PostgreSQL
const { neon } = require('@neondatabase/serverless');

async function checkTables() {
  console.log('🔍 Проверяем структуру таблиц в Neon PostgreSQL...');
  
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL не установлен');
    return;
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    console.log('✅ Подключение к Neon PostgreSQL успешно!');

    // Проверяем существующие таблицы
    console.log('📋 Проверяем существующие таблицы...');
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    console.log('📊 Найденные таблицы:', tables.map(t => t.table_name));

    // Проверяем структуру таблицы categories
    if (tables.some(t => t.table_name === 'categories')) {
      console.log('📋 Структура таблицы categories:');
      const categoryColumns = await sql`
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns
        WHERE table_name = 'categories'
        ORDER BY ordinal_position
      `;
      console.log(categoryColumns);
      
      // Проверяем данные
      const categoryData = await sql`SELECT * FROM categories LIMIT 5`;
      console.log('📊 Данные в categories (первые 5 записей):', categoryData);
    }

    // Проверяем структуру таблицы products
    if (tables.some(t => t.table_name === 'products')) {
      console.log('📋 Структура таблицы products:');
      const productColumns = await sql`
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns
        WHERE table_name = 'products'
        ORDER BY ordinal_position
      `;
      console.log(productColumns);
      
      // Проверяем данные
      const productData = await sql`SELECT * FROM products LIMIT 5`;
      console.log('📊 Данные в products (первые 5 записей):', productData);
    }

  } catch (error) {
    console.error('❌ Ошибка проверки таблиц:', error.message);
    console.error('🔍 Детали:', error);
  }
}

// Запускаем проверку
checkTables();
