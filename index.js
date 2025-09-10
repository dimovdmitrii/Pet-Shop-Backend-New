// Упрощенная версия API с Neon serverless драйвером
const express = require("express");
const cors = require("cors");
const { neon } = require('@neondatabase/serverless');

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

// Инициализация Neon подключения
let sql;
if (process.env.NODE_ENV === "production") {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL not found in production");
    sql = null; // Используем моковые данные если нет DATABASE_URL
  } else {
    console.log("Connecting to Neon PostgreSQL...");
    try {
      sql = neon(process.env.DATABASE_URL);
      console.log("✅ Neon connection initialized");
    } catch (error) {
      console.error("❌ Failed to initialize Neon connection:", error);
      sql = null; // Используем моковые данные при ошибке
    }
  }
} else {
  // Для локальной разработки используем моковые данные
  console.log("Running in development mode with mock data");
  sql = null; // Будем использовать моковые данные
}

// Моковые данные для локальной разработки
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

// Базовый роут для проверки
app.get("/", (req, res) => {
  res.json({ 
    message: "Pet Shop API is running!",
    environment: process.env.NODE_ENV || "development",
    hasDatabaseUrl: !!process.env.DATABASE_URL,
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

// Роут для проверки здоровья API с Neon
app.get("/health", async (req, res) => {
  try {
    if (!sql) {
      return res.json({
        status: "OK",
        database: "Mock data mode",
        environment: process.env.NODE_ENV || "development",
        hasDatabaseUrl: !!process.env.DATABASE_URL,
        timestamp: new Date().toISOString()
      });
    }

    // Проверяем подключение к базе данных
    const result = await sql`SELECT NOW() as current_time`;
    
    // Проверяем количество записей
    const categoryCount = await sql`SELECT COUNT(*) FROM categories`;
    const productCount = await sql`SELECT COUNT(*) FROM products`;
    
    res.json({
      status: "OK",
      database: "Connected",
      environment: process.env.NODE_ENV || "development",
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      categories: categoryCount[0].count,
      products: productCount[0].count,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("Health check error:", error);
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

// Роуты с Neon драйвером
app.get("/categories/all", async (req, res) => {
  try {
    console.log("📋 Fetching categories...");
    console.log("🔍 SQL object:", sql ? "initialized" : "null");
    
    if (!sql) {
      console.log("📦 Using mock categories data");
      return res.json(mockCategories);
    }
    
    console.log("🗄️ Querying database for categories...");
    const categories = await sql`SELECT * FROM categories ORDER BY id`;
    console.log(`✅ Found ${categories.length} categories in database`);
    res.json(categories);
  } catch (error) {
    console.error("❌ Error fetching categories:", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

app.get("/categories/:id", async (req, res) => {
  try {
    if (!sql) {
      // Используем моковые данные для локальной разработки
      const categoryId = parseInt(req.params.id);
      const category = mockCategories.find(c => c.id === categoryId);
      const products = mockProducts.filter(p => p.categoryId === categoryId);
      
      if (!category) {
        return res.status(404).json({ status: "ERR", message: "Category not found" });
      }
      
      return res.json({
        category,
        data: products
      });
    }
    
    const categoryId = parseInt(req.params.id);
    const category = await sql`SELECT * FROM categories WHERE id = ${categoryId}`;
    const products = await sql`SELECT * FROM products WHERE "categoryId" = ${categoryId}`;
    
    if (category.length === 0) {
      return res.status(404).json({ status: "ERR", message: "Category not found" });
    }
    
    res.json({
      category: category[0],
      data: products
    });
  } catch (error) {
    console.error("Error fetching category products:", error);
    res.status(500).json({ error: "Failed to fetch category products" });
  }
});

app.get("/products/all", async (req, res) => {
  try {
    if (!sql) {
      // Используем моковые данные для локальной разработки
      return res.json(mockProducts);
    }
    
    const products = await sql`SELECT * FROM products ORDER BY id`;
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    if (!sql) {
      // Используем моковые данные для локальной разработки
      const productId = parseInt(req.params.id);
      const product = mockProducts.find(p => p.id === productId);
      
      if (!product) {
        return res.status(404).json({ status: "ERR", message: "Product not found" });
      }
      
      return res.json(product);
    }
    
    const productId = parseInt(req.params.id);
    const product = await sql`SELECT * FROM products WHERE id = ${productId}`;
    
    if (product.length === 0) {
      return res.status(404).json({ status: "ERR", message: "Product not found" });
    }
    
    res.json(product[0]);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

app.get("/sale/send", async (req, res) => {
  try {
    if (!sql) {
      // Используем моковые данные для локальной разработки
      const saleProducts = mockProducts.filter(p => p.isSale);
      return res.json(saleProducts);
    }
    
    const saleProducts = await sql`SELECT * FROM products WHERE "isSale" = true`;
    res.json(saleProducts);
  } catch (error) {
    console.error("Error fetching sale products:", error);
    res.status(500).json({ error: "Failed to fetch sale products" });
  }
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