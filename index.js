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
  } else {
    console.log("Connecting to Neon PostgreSQL...");
    sql = neon(process.env.DATABASE_URL);
  }
}

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
      return res.status(500).json({
        status: "ERROR",
        database: "Not connected",
        error: "No database connection",
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
    if (!sql) {
      return res.status(500).json({ error: "Database not connected" });
    }
    
    const categories = await sql`SELECT * FROM categories ORDER BY id`;
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

app.get("/categories/:id", async (req, res) => {
  try {
    if (!sql) {
      return res.status(500).json({ error: "Database not connected" });
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
      return res.status(500).json({ error: "Database not connected" });
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
      return res.status(500).json({ error: "Database not connected" });
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
      return res.status(500).json({ error: "Database not connected" });
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