# 🚀 Инструкции по миграции данных в Neon PostgreSQL

## ❌ Проблема
API работает, но таблицы не созданы в Neon PostgreSQL:
- `"relation \"categories\" does not exist"`
- `"relation \"products\" does not exist"`

## ✅ Решение
Нужно создать таблицы в Neon PostgreSQL.

## 📋 Шаги для миграции:

### 1. Получите DATABASE_URL из Neon
- Зайдите в панель Neon (https://console.neon.tech)
- Найдите ваш проект
- Скопируйте Connection String

### 2. Установите переменную окружения
**Windows PowerShell:**
```powershell
$env:DATABASE_URL="postgresql://username:password@host/database?sslmode=require"
```

**Windows CMD:**
```cmd
set DATABASE_URL=postgresql://username:password@host/database?sslmode=require
```

### 3. Запустите миграцию
```powershell
node create-tables-neon.js
```

### 4. Проверьте результат
После успешной миграции проверьте API:
- https://pet-shop-backend-new.vercel.app/health
- https://pet-shop-backend-new.vercel.app/categories/all
- https://pet-shop-backend-new.vercel.app/products/all

## 🎯 Ожидаемый результат
После миграции API должен возвращать:
- ✅ Health check: "Connected" вместо "Disconnected"
- ✅ Категории: массив с 8 категориями
- ✅ Продукты: массив с 5+ продуктами

## 🔧 Альтернативный способ
Если не получается запустить локально, можно:
1. Зайти в Neon Console
2. Открыть SQL Editor
3. Выполнить SQL команды из скрипта вручную
