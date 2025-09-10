// Добавление тестовых данных в Neon PostgreSQL
const { neon } = require('@neondatabase/serverless');

async function addTestData() {
  console.log('🚀 Добавляем тестовые данные в Neon PostgreSQL...');
  
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL не установлен');
    return;
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    console.log('✅ Подключение к Neon PostgreSQL успешно!');

    // Проверяем, есть ли уже данные
    const categoryCount = await sql`SELECT COUNT(*) FROM categories`;
    const productCount = await sql`SELECT COUNT(*) FROM products`;
    
    console.log(`📊 Текущее количество категорий: ${categoryCount[0].count}`);
    console.log(`📊 Текущее количество продуктов: ${productCount[0].count}`);

    if (categoryCount[0].count === 0) {
      console.log('📝 Добавляем категории...');
      
      // Добавляем категории
      await sql`
        INSERT INTO categories (name, image) VALUES
        ('Корм для собак', 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300'),
        ('Корм для кошек', 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=300'),
        ('Игрушки', 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300'),
        ('Аксессуары', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300'),
        ('Здоровье', 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300'),
        ('Гигиена', 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300'),
        ('Переноски', 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300'),
        ('Лежаки', 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=300')
      `;
      console.log('✅ 8 категорий добавлены!');
    }

    if (productCount[0].count === 0) {
      console.log('📝 Добавляем продукты...');
      
      // Добавляем продукты
      await sql`
        INSERT INTO products (name, price, oldPrice, image, categoryId, isNew, isSale) VALUES
        ('Корм для собак премиум', 1500.00, 1800.00, 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300', 1, false, true),
        ('Корм для кошек супер', 1200.00, null, 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=300', 2, true, false),
        ('Мяч для собак', 300.00, null, 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300', 3, false, false),
        ('Когтеточка для кошек', 800.00, 1000.00, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300', 3, false, true),
        ('Ошейник с GPS', 2500.00, null, 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300', 4, true, false),
        ('Витамины для собак', 600.00, 750.00, 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300', 5, false, true),
        ('Шампунь для кошек', 400.00, null, 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300', 6, false, false),
        ('Переноска для кошек', 1200.00, null, 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=300', 7, true, false),
        ('Лежак для собак', 800.00, 1000.00, 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300', 8, false, true),
        ('Игрушка-мышка', 200.00, null, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300', 3, false, false)
      `;
      console.log('✅ 10 продуктов добавлены!');
    }

    // Проверяем результат
    const finalCategoryCount = await sql`SELECT COUNT(*) FROM categories`;
    const finalProductCount = await sql`SELECT COUNT(*) FROM products`;
    
    console.log(`📊 Итого категорий: ${finalCategoryCount[0].count}`);
    console.log(`📊 Итого продуктов: ${finalProductCount[0].count}`);

    console.log('🎉 Тестовые данные добавлены успешно!');
    
  } catch (error) {
    console.error('❌ Ошибка добавления данных:', error.message);
    console.error('🔍 Детали:', error);
  }
}

// Запускаем добавление данных
addTestData();
