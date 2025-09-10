// Проверка переменных окружения
console.log('🔍 Проверяем переменные окружения...');
console.log('');

console.log('NODE_ENV:', process.env.NODE_ENV || 'не установлена');
console.log('PORT:', process.env.PORT || 'не установлена');
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'установлена' : 'НЕ УСТАНОВЛЕНА');

if (process.env.DATABASE_URL) {
  console.log('DATABASE_URL (первые 30 символов):', process.env.DATABASE_URL.substring(0, 30) + '...');
} else {
  console.log('❌ DATABASE_URL не найдена!');
  console.log('💡 Это может быть причиной ошибки FUNCTION_INVOCATION_FAILED');
}

console.log('');
console.log('🔧 Для настройки DATABASE_URL в Vercel:');
console.log('1. Зайдите в настройки проекта в Vercel');
console.log('2. Перейдите в раздел "Environment Variables"');
console.log('3. Добавьте переменную DATABASE_URL с вашим Neon URL');
console.log('4. Передеплойте проект');
