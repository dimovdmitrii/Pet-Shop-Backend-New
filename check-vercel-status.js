// Проверка статуса Vercel деплоя
const https = require('https');

async function checkVercelStatus() {
  console.log('🔍 Проверяем статус Vercel деплоя...');
  
  const url = 'https://pet-shop-backend-new.vercel.app/';
  
  try {
    const response = await fetch(url);
    console.log('✅ Статус ответа:', response.status);
    console.log('📋 Заголовки:', Object.fromEntries(response.headers));
    
    if (response.status === 200) {
      const data = await response.text();
      console.log('📄 Ответ сервера:', data);
    } else {
      console.log('❌ Ошибка:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('❌ Ошибка подключения:', error.message);
  }
}

// Проверяем также health endpoint
async function checkHealthEndpoint() {
  console.log('\n🔍 Проверяем health endpoint...');
  
  try {
    const response = await fetch('https://pet-shop-backend-new.vercel.app/health');
    console.log('✅ Health статус:', response.status);
    
    if (response.status === 200) {
      const data = await response.json();
      console.log('📄 Health данные:', JSON.stringify(data, null, 2));
    } else {
      const errorText = await response.text();
      console.log('❌ Health ошибка:', errorText);
    }
  } catch (error) {
    console.error('❌ Ошибка health check:', error.message);
  }
}

// Запускаем проверки
checkVercelStatus().then(() => checkHealthEndpoint());
