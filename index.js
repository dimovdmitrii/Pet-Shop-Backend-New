const express = require("express");
const categories = require("./routes/categories");
const sale = require("./routes/sale");
const order = require("./routes/order");
const products = require("./routes/products");
const sequelize = require("./database/database");
const cors = require("cors");
const Category = require("./database/models/category");
const Product = require("./database/models/product");

// Используем порт из переменной окружения или 3333 для локальной разработки
const PORT = process.env.PORT || 3333;

Category.hasMany(Product);
Product.belongsTo(Category);

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// CORS настройки для продакшена
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://pet-shop-backend-new.vercel.app/",
    ],
    credentials: true,
  })
);

// Роуты
app.use("/categories", categories);
app.use("/products", products);
app.use("/sale", sale);
app.use("/order", order);

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// Обработка 404
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Базовый роут для проверки
app.get("/", (req, res) => {
  res.json({ message: "Pet Shop API is running!" });
});

// Роут для проверки здоровья API
app.get("/health", async (req, res) => {
  try {
    // Проверяем подключение к базе данных
    await sequelize.authenticate();
    
    // Проверяем количество записей
    const categoryCount = await Category.count();
    const productCount = await Product.count();
    
    res.json({
      status: "OK",
      database: "Connected",
      environment: process.env.NODE_ENV || "development",
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      categories: categoryCount,
      products: productCount,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      database: "Disconnected",
      error: error.message,
      environment: process.env.NODE_ENV || "development",
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      timestamp: new Date().toISOString()
    });
  }
});

// Инициализация базы данных
const initDB = async () => {
  try {
    // Проверяем подключение к базе данных
    await sequelize.authenticate();
    console.log("Database connection established successfully");
    
    // В продакшене не синхронизируем автоматически, так как таблицы уже созданы
    if (process.env.NODE_ENV !== "production") {
      await sequelize.sync();
      console.log("Database synchronized successfully");

      // Добавляем тестовые данные если таблицы пустые
      const categoryCount = await Category.count();
      if (categoryCount === 0) {
        // Создаем тестовые категории
        await Category.bulkCreate([
          { name: "Dogs", image: "/images/dogs.jpg" },
          { name: "Cats", image: "/images/cats.jpg" },
          { name: "Birds", image: "/images/birds.jpg" },
        ]);

        // Создаем тестовые продукты
        await Product.bulkCreate([
          {
            name: "Dog Food Premium",
            price: 25.99,
            oldPrice: 30.99,
            image: "/images/dog-food.jpg",
            categoryId: 1,
            isNew: true,
            isSale: false,
          },
          {
            name: "Cat Toy",
            price: 15.5,
            oldPrice: 20.0,
            image: "/images/cat-toy.jpg",
            categoryId: 2,
            isNew: false,
            isSale: true,
          },
        ]);

        console.log("Test data created successfully");
      }
    }
  } catch (err) {
    console.error("Database initialization error:", err);
  }
};

// Инициализируем базу данных при старте
initDB();

// Для локальной разработки
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`\n\nServer started on port ${PORT}...`);
  });
}

// Экспортируем приложение для Vercel
module.exports = app;
