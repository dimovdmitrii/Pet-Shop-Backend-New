const { neon } = require('@neondatabase/serverless');

// Подключение к базе данных
const DATABASE_URL = 'postgresql://neondb_owner:npg_3RZjcmbxoyL0@ep-snowy-field-ag3r1okt-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';
const sql = neon(DATABASE_URL);

// Обновление URL изображений на внешние
async function updateImageUrls() {
  try {
    console.log('🔄 Обновляем URL изображений...');
    
    // Обновляем изображения категорий
    const categoryUpdates = [
      { id: 1, url: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop' },
      { id: 2, url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop' },
      { id: 3, url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop' },
      { id: 4, url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop' },
      { id: 5, url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop' },
      { id: 6, url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop' },
      { id: 7, url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop' },
      { id: 8, url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop' }
    ];

    for (const update of categoryUpdates) {
      await sql`UPDATE "Categories" SET image = ${update.url} WHERE id = ${update.id}`;
      console.log(`✅ Обновлена категория ${update.id}`);
    }

    // Обновляем изображения продуктов
    const productUpdates = [
      { id: 1, url: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop' },
      { id: 2, url: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop' },
      { id: 3, url: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop' },
      { id: 4, url: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop' },
      { id: 5, url: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop' },
      { id: 6, url: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop' },
      { id: 7, url: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop' },
      { id: 8, url: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop' },
      { id: 9, url: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop' },
      { id: 10, url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop' },
      { id: 11, url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop' },
      { id: 12, url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop' },
      { id: 13, url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop' },
      { id: 14, url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop' },
      { id: 15, url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop' },
      { id: 16, url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop' },
      { id: 17, url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop' },
      { id: 18, url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop' },
      { id: 19, url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop' },
      { id: 20, url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop' },
      { id: 21, url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop' },
      { id: 22, url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop' },
      { id: 23, url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop' },
      { id: 24, url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop' },
      { id: 25, url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop' }
    ];

    for (const update of productUpdates) {
      await sql`UPDATE "Products" SET image = ${update.url} WHERE id = ${update.id}`;
      console.log(`✅ Обновлен продукт ${update.id}`);
    }

    console.log('🎉 Все изображения обновлены!');
    
  } catch (error) {
    console.error('❌ Ошибка при обновлении изображений:', error);
  }
}

updateImageUrls();
