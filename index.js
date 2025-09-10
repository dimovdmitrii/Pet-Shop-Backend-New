const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 3333;

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://petshop-project-9yvdnmk40-dimovdmitriis-projects.vercel.app",
      "https://petshop-project-blond.vercel.app",
    ],
    credentials: true,
  })
);

// Базовый роут для проверки
app.get("/", (req, res) => {
  res.json({ message: "Pet Shop API is running!" });
});

// Простые тестовые роуты
app.get("/categories", (req, res) => {
  res.json([
    { id: 1, name: "Dogs", image: "/images/dogs.jpg" },
    { id: 2, name: "Cats", image: "/images/cats.jpg" },
    { id: 3, name: "Birds", image: "/images/birds.jpg" },
  ]);
});

app.get("/products", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Dog Food Premium",
      price: 25.99,
      oldPrice: 30.99,
      image: "/images/dog-food.jpg",
      categoryId: 1,
      isNew: true,
      isSale: false,
    },
    {
      id: 2,
      name: "Cat Toy",
      price: 15.5,
      oldPrice: 20.0,
      image: "/images/cat-toy.jpg",
      categoryId: 2,
      isNew: false,
      isSale: true,
    },
  ]);
});

app.get("/sale", (req, res) => {
  res.json([
    {
      id: 2,
      name: "Cat Toy",
      price: 15.5,
      oldPrice: 20.0,
      image: "/images/cat-toy.jpg",
      categoryId: 2,
      isNew: false,
      isSale: true,
    },
  ]);
});

// Простой роут для заказов
app.post("/order", (req, res) => {
  console.log("Order received:", req.body);
  res.json({ message: "Order received successfully!" });
});

// Для локальной разработки
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`\n\nServer started on port ${PORT}...`);
  });
}

// Экспортируем приложение для Vercel
module.exports = app;
