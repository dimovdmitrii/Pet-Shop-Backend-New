// Скрипт для миграции данных в Neon PostgreSQL
const { neon } = require('@neondatabase/serverless');

async function migrateToNeon() {
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL не установлен');
    return;
  }

  console.log('🚀 Начинаем миграцию в Neon PostgreSQL...');

  try {
    const sql = neon(process.env.DATABASE_URL);
    
    // Создаем таблицы
    console.log('📋 Создаем таблицы...');
    
    // Создаем таблицу категорий
    await sql`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        image TEXT,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;

    // Создаем таблицу продуктов
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        price DECIMAL(10,2),
        "oldPrice" DECIMAL(10,2),
        description TEXT,
        image TEXT,
        "categoryId" INTEGER REFERENCES categories(id),
        "isNew" BOOLEAN DEFAULT false,
        "isSale" BOOLEAN DEFAULT false,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;

    console.log('✅ Таблицы созданы успешно!');

    // Проверяем, есть ли данные
    const categoryCount = await sql`SELECT COUNT(*) FROM categories`;
    const productCount = await sql`SELECT COUNT(*) FROM products`;

    console.log(`📊 Категорий: ${categoryCount[0].count}`);
    console.log(`📊 Продуктов: ${productCount[0].count}`);

    if (categoryCount[0].count === 0) {
      console.log('📝 Добавляем тестовые данные...');
      
      // Добавляем категории
      await sql`
        INSERT INTO categories (name, image) VALUES
        ('Dogs', '/category_img/1.jpeg'),
        ('Cats', '/category_img/2.jpeg'),
        ('Birds', '/category_img/3.jpeg'),
        ('Fish', '/category_img/4.jpeg'),
        ('Reptiles', '/category_img/5.jpeg'),
        ('Small Animals', '/category_img/6.jpeg'),
        ('Accessories', '/category_img/7.jpeg'),
        ('Food', '/category_img/8.jpeg');
      `;

      // Добавляем продукты
      await sql`
        INSERT INTO products (name, price, "oldPrice", image, "categoryId", "isNew", "isSale") VALUES
        ('Premium Dog Food', 25.99, 30.99, '/product_img/1.jpeg', 1, true, false),
        ('Cat Toy Set', 15.50, 20.00, '/product_img/2.jpeg', 2, false, true),
        ('Bird Cage', 45.00, 50.00, '/product_img/3.jpeg', 3, true, false),
        ('Fish Tank', 80.00, 100.00, '/product_img/4.jpeg', 4, false, true),
        ('Reptile Heat Lamp', 35.00, 40.00, '/product_img/5.jpeg', 5, true, false),
        ('Hamster Wheel', 12.00, 15.00, '/product_img/6.jpeg', 6, false, true),
        ('Dog Leash', 18.00, 22.00, '/product_img/7.jpeg', 7, true, false),
        ('Cat Litter', 20.00, 25.00, '/product_img/8.jpeg', 8, false, true);
      `;

      console.log('✅ Тестовые данные добавлены!');
    }

    console.log('🎉 Миграция завершена успешно!');

  } catch (error) {
    console.error('❌ Ошибка миграции:', error.message);
    console.error('Полная ошибка:', error);
  }
}

// Запускаем миграцию только если это основной файл
if (require.main === module) {
  migrateToNeon();
}

module.exports = migrateToNeon;
