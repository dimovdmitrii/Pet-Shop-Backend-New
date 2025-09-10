// Файл для проверки зависимостей
console.log("Checking dependencies...");

try {
  const pg = require('pg');
  console.log("✅ pg package is available");
  console.log("pg version:", pg.version || "unknown");
} catch (error) {
  console.error("❌ pg package is missing:", error.message);
}

try {
  const sequelize = require('sequelize');
  console.log("✅ sequelize package is available");
  console.log("sequelize version:", sequelize.version || "unknown");
} catch (error) {
  console.error("❌ sequelize package is missing:", error.message);
}

try {
  const express = require('express');
  console.log("✅ express package is available");
} catch (error) {
  console.error("❌ express package is missing:", error.message);
}

console.log("Environment:", process.env.NODE_ENV || "development");
console.log("Has DATABASE_URL:", !!process.env.DATABASE_URL);

// Экспортируем для использования в других файлах
module.exports = {
  pg: require('pg'),
  sequelize: require('sequelize'),
  express: require('express')
};
