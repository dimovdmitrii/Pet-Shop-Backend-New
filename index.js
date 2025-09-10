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
      "http://localhost:5173", // Vite dev server
      "http://localhost:3000", // Альтернативный dev порт
      "https://petshop-project-9yvdnmk40-dimovdmitriis-projects.vercel.app",
      "https://petshop-project-blond.vercel.app",
    ],
    credentials: true,
  })
);

// Роуты
app.use("/categories", categories);
app.use("/products", products);
app.use("/sale", sale);
app.use("/order", order);

// Базовый роут для проверки
app.get("/", (req, res) => {
  res.json({ message: "Pet Shop API is running!" });
});

// Инициализация базы данных
const initDB = async () => {
  try {
    await sequelize.sync();
    console.log("Database synchronized successfully");
  } catch (err) {
    console.error("Database sync error:", err);
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
