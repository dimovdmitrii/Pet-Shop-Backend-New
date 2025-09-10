// Упрощенная версия для тестирования на Vercel
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3333;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS настройки
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://petshop-project-blond.vercel.app",
    ],
    credentials: true,
  })
);

// Базовый роут для проверки
app.get("/", (req, res) => {
  res.json({ 
    message: "Pet Shop API is running!",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString()
  });
});

// Простой роут для тестирования
app.get("/test", (req, res) => {
  res.json({ 
    status: "OK",
    message: "API is working",
    environment: process.env.NODE_ENV || "development",
    hasDatabaseUrl: !!process.env.DATABASE_URL,
    timestamp: new Date().toISOString()
  });
});

// Моковые данные для тестирования
const mockCategories = [
  { id: 1, name: "Dogs", image: "/category_img/1.jpeg" },
  { id: 2, name: "Cats", image: "/category_img/2.jpeg" },
  { id: 3, name: "Birds", image: "/category_img/3.jpeg" },
  { id: 4, name: "Fish", image: "/category_img/4.jpeg" },
  { id: 5, name: "Reptiles", image: "/category_img/5.jpeg" },
  { id: 6, name: "Small Animals", image: "/category_img/6.jpeg" },
  { id: 7, name: "Accessories", image: "/category_img/7.jpeg" },
  { id: 8, name: "Food", image: "/category_img/8.jpeg" }
];

const mockProducts = [
  { id: 1, name: "Premium Dog Food", price: 25.99, oldPrice: 30.99, image: "/product_img/1.jpeg", categoryId: 1, isNew: true, isSale: false },
  { id: 2, name: "Cat Toy Set", price: 15.50, oldPrice: 20.00, image: "/product_img/2.jpeg", categoryId: 2, isNew: false, isSale: true },
  { id: 3, name: "Bird Cage", price: 45.00, oldPrice: 50.00, image: "/product_img/3.jpeg", categoryId: 3, isNew: true, isSale: false },
  { id: 4, name: "Fish Tank", price: 80.00, oldPrice: 100.00, image: "/product_img/4.jpeg", categoryId: 4, isNew: false, isSale: true },
  { id: 5, name: "Reptile Heat Lamp", price: 35.00, oldPrice: 40.00, image: "/product_img/5.jpeg", categoryId: 5, isNew: true, isSale: false },
  { id: 6, name: "Hamster Wheel", price: 12.00, oldPrice: 15.00, image: "/product_img/6.jpeg", categoryId: 6, isNew: false, isSale: true },
  { id: 7, name: "Dog Leash", price: 18.00, oldPrice: 22.00, image: "/product_img/7.jpeg", categoryId: 7, isNew: true, isSale: false },
  { id: 8, name: "Cat Litter", price: 20.00, oldPrice: 25.00, image: "/product_img/8.jpeg", categoryId: 8, isNew: false, isSale: true }
];

// Роуты с моковыми данными
app.get("/categories/all", (req, res) => {
  res.json(mockCategories);
});

app.get("/categories/:id", (req, res) => {
  const categoryId = parseInt(req.params.id);
  const category = mockCategories.find(c => c.id === categoryId);
  const products = mockProducts.filter(p => p.categoryId === categoryId);
  
  if (!category) {
    return res.status(404).json({ status: "ERR", message: "Category not found" });
  }
  
  res.json({
    category,
    data: products
  });
});

app.get("/products/all", (req, res) => {
  res.json(mockProducts);
});

app.get("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = mockProducts.find(p => p.id === productId);
  
  if (!product) {
    return res.status(404).json({ status: "ERR", message: "Product not found" });
  }
  
  res.json(product);
});

app.get("/sale/send", (req, res) => {
  const saleProducts = mockProducts.filter(p => p.isSale);
  res.json(saleProducts);
});

app.post("/sale/send", (req, res) => {
  res.json({ status: "OK", message: "Sale request processed" });
});

app.get("/order/send", (req, res) => {
  res.json({ message: "Order endpoint is ready" });
});

app.post("/order/send", (req, res) => {
  try {
    const orderData = req.body;
    console.log("Order received:", orderData);
    
    res.json({
      status: "OK",
      message: "Order processed successfully",
      orderId: Date.now(),
    });
  } catch (error) {
    console.error("Error processing order:", error);
    res.status(500).json({
      status: "ERROR",
      message: "Failed to process order",
    });
  }
});

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// Обработка 404
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Для локальной разработки
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}...`);
  });
}

// Экспортируем приложение для Vercel
module.exports = app;
