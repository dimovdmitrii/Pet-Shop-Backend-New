# Инструкции по деплою на Vercel

## Подготовка к деплою

### 1. Настройка базы данных

Для продакшена вам понадобится облачная база данных PostgreSQL. Рекомендуемые провайдеры:

- **Neon** (бесплатный план): https://neon.tech/
- **Supabase** (бесплатный план): https://supabase.com/
- **Railway** (бесплатный план): https://railway.app/
- **PlanetScale** (бесплатный план): https://planetscale.com/

### 2. Создание базы данных

1. Зарегистрируйтесь на одном из провайдеров
2. Создайте новую базу данных PostgreSQL
3. Скопируйте URL подключения (DATABASE_URL)

### 3. Деплой на Vercel

#### Вариант 1: Через веб-интерфейс Vercel

1. Зайдите на https://vercel.com/
2. Войдите в аккаунт (можно через GitHub)
3. Нажмите "New Project"
4. Подключите ваш GitHub репозиторий
5. В настройках проекта добавьте переменные окружения:
   - `DATABASE_URL` - URL вашей PostgreSQL базы данных
   - `NODE_ENV` - `production`
6. Нажмите "Deploy"

#### Вариант 2: Через Vercel CLI

1. Установите Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Войдите в аккаунт:
   ```bash
   vercel login
   ```

3. Деплойте проект:
   ```bash
   vercel
   ```

4. Добавьте переменные окружения:
   ```bash
   vercel env add DATABASE_URL
   vercel env add NODE_ENV
   ```

### 4. Настройка переменных окружения в Vercel

В панели управления Vercel:
1. Перейдите в Settings → Environment Variables
2. Добавьте:
   - `DATABASE_URL`: `postgresql://username:password@host:port/database`
   - `NODE_ENV`: `production`

### 5. Инициализация базы данных

После деплоя вам нужно будет создать таблицы в новой базе данных. Это можно сделать:

1. Через веб-интерфейс провайдера БД
2. Через миграции Sequelize (если настроены)
3. Вручную скопировав структуру из SQLite

### 6. Тестирование

После деплоя проверьте:
- `https://your-app.vercel.app/categories/all` - получение категорий
- `https://your-app.vercel.app/products/all` - получение продуктов

## Локальная разработка

Для локальной разработки:

1. Скопируйте `env.example` в `.env.local`
2. Заполните переменные окружения
3. Запустите: `npm run dev`

## Структура проекта

```
├── index.js              # Главный файл приложения
├── vercel.json           # Конфигурация Vercel
├── .vercelignore         # Игнорируемые файлы
├── package.json          # Зависимости и скрипты
├── database/
│   ├── database.js       # Конфигурация БД
│   └── models/           # Модели Sequelize
├── routes/               # API маршруты
└── public/               # Статические файлы
```

## Полезные ссылки

- [Vercel Documentation](https://vercel.com/docs)
- [Sequelize Documentation](https://sequelize.org/)
- [PostgreSQL on Vercel](https://vercel.com/docs/concepts/integrations/databases)
