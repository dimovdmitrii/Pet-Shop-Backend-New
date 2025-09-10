// Тест API с детальным логированием
const https = require('https');

async function testAPI() {
  console.log('🔍 Тестируем API с детальным логированием...');
  
  const endpoints = [
    'https://pet-shop-backend-new.vercel.app/health',
    'https://pet-shop-backend-new.vercel.app/categories/all',
    'https://pet-shop-backend-new.vercel.app/products/all',
    'https://pet-shop-backend-new.vercel.app/products/1',
    'https://pet-shop-backend-new.vercel.app/sale/send',
    'https://pet-shop-backend-new.vercel.app/categories/1'
  ];
  
  for (const endpoint of endpoints) {
    try {
      console.log(`\n📡 Тестируем: ${endpoint}`);
      const response = await fetch(endpoint);
      console.log(`✅ Статус: ${response.status}`);
      
      if (response.status === 200) {
        const data = await response.json();
        console.log(`📄 Ответ:`, JSON.stringify(data, null, 2));
      } else {
        const errorText = await response.text();
        console.log(`❌ Ошибка:`, errorText);
      }
    } catch (error) {
      console.error(`❌ Ошибка подключения:`, error.message);
    }
  }
}

// Запускаем тест
testAPI();
