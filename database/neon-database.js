// Конфигурация для Neon PostgreSQL с serverless драйвером
const { neon } = require('@neondatabase/serverless');

// Создаем подключение к Neon
let sql;

if (process.env.NODE_ENV === "production") {
  // Для продакшена (Vercel) используем Neon serverless драйвер
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is required for production");
  }
  
  console.log("Connecting to Neon PostgreSQL...");
  sql = neon(process.env.DATABASE_URL);
} else {
  // Для локальной разработки используем обычный pg драйвер
  const { Pool } = require('pg');
  sql = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://localhost:5432/petshop'
  });
}

module.exports = sql;
