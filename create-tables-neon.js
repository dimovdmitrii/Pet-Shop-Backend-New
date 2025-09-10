// Создание таблиц в Neon PostgreSQL
const { neon } = require('@neondatabase/serverless');

async function createTables() {
  console.log('🚀 Создаем таблицы в Neon PostgreSQL...');
  
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL не установлен');
    console.log('💡 Установите переменную окружения DATABASE_URL с вашим Neon URL');
    return;
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    console.log('✅ Подключение к Neon PostgreSQL успешно!');

    // Создаем таблицу categories
    console.log('📋 Создаем таблицу categories...');
    await sql`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✅ Таблица categories создана!');

    // Создаем таблицу products
    console.log('📋 Создаем таблицу products...');
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        oldPrice DECIMAL(10, 2),
        image VARCHAR(500),
        categoryId INTEGER REFERENCES categories(id),
        isNew BOOLEAN DEFAULT false,
        isSale BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✅ Таблица products создана!');

    // Проверяем, есть ли данные
    const categoryCount = await sql`SELECT COUNT(*) FROM categories`;
    const productCount = await sql`SELECT COUNT(*) FROM products`;
    
    console.log(`📊 Категорий в базе: ${categoryCount[0].count}`);
    console.log(`📊 Продуктов в базе: ${productCount[0].count}`);

    if (categoryCount[0].count === 0) {
      console.log('📝 Добавляем тестовые данные...');
      
      // Добавляем категории
      await sql`
        INSERT INTO categories (name, image) VALUES
        ('Корм для собак', 'https://example.com/dog-food.jpg'),
        ('Корм для кошек', 'https://example.com/cat-food.jpg'),
        ('Игрушки', 'https://example.com/toys.jpg'),
        ('Аксессуары', 'https://example.com/accessories.jpg'),
        ('Здоровье', 'https://example.com/health.jpg'),
        ('Гигиена', 'https://example.com/hygiene.jpg'),
        ('Переноски', 'https://example.com/carriers.jpg'),
        ('Лежаки', 'https://example.com/beds.jpg')
      `;
      console.log('✅ Категории добавлены!');

      // Добавляем продукты
      await sql`
        INSERT INTO products (name, price, oldPrice, image, categoryId, isNew, isSale) VALUES
        ('Корм для собак премиум', 1500.00, 1800.00, 'https://example.com/dog-food-premium.jpg', 1, false, true),
        ('Корм для кошек супер', 1200.00, null, 'https://example.com/cat-food-super.jpg', 2, true, false),
        ('Мяч для собак', 300.00, null, 'https://example.com/dog-ball.jpg', 3, false, false),
        ('Когтеточка для кошек', 800.00, 1000.00, 'https://example.com/cat-scratcher.jpg', 3, false, true),
        ('Ошейник с GPS', 2500.00, null, 'https://example.com/gps-collar.jpg', 4, true, false)
      `;
      console.log('✅ Продукты добавлены!');
    }

    console.log('🎉 Миграция завершена успешно!');
    
  } catch (error) {
    console.error('❌ Ошибка миграции:', error.message);
    console.error('🔍 Детали:', error);
  }
}

// Запускаем миграцию
createTables();
