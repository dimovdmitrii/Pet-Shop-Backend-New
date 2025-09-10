const { Sequelize } = require("sequelize");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// DATABASE_URL для Railway PostgreSQL
const DATABASE_URL =
  "postgresql://postgres:INJFHGmHTlzgtShrRGXbZMYikfyHyiJG@centerbeam.proxy.rlwy.net:16795/railway";

// Подключение к PostgreSQL (Railway)
const pgSequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

// Подключение к локальной SQLite
const sqlitePath = path.join(__dirname, "database.sqlite");
const sqliteDb = new sqlite3.Database(sqlitePath);

// Модели для PostgreSQL
const Category = pgSequelize.define("Category", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: Sequelize.STRING,
  image: Sequelize.STRING,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});

const Product = pgSequelize.define("Product", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: Sequelize.STRING,
  price: Sequelize.FLOAT,
  discont_price: Sequelize.FLOAT,
  description: Sequelize.TEXT,
  categoryId: Sequelize.INTEGER,
  image: Sequelize.STRING,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});

Category.hasMany(Product);
Product.belongsTo(Category);

async function migrateData() {
  try {
    console.log("Starting migration...");

    // Синхронизируем PostgreSQL
    await pgSequelize.sync({ force: true });
    console.log("PostgreSQL tables created");

    // Мигрируем категории
    sqliteDb.all("SELECT * FROM Categories", async (err, categories) => {
      if (err) {
        console.error("Error reading categories:", err);
        return;
      }

      console.log("Found categories:", categories.length);

      for (const category of categories) {
        await Category.create({
          id: category.id,
          title: category.title,
          image: category.image,
          createdAt: new Date(category.createdAt),
          updatedAt: new Date(category.updatedAt),
        });
      }
      console.log("Categories migrated:", categories.length);

      // Мигрируем продукты
      sqliteDb.all("SELECT * FROM Products", async (err, products) => {
        if (err) {
          console.error("Error reading products:", err);
          return;
        }

        console.log("Found products:", products.length);

        for (const product of products) {
          await Product.create({
            id: product.id,
            title: product.title,
            price: product.price,
            discont_price: product.discont_price,
            description: product.description,
            categoryId: product.categoryId,
            image: product.image,
            createdAt: new Date(product.createdAt),
            updatedAt: new Date(product.updatedAt),
          });
        }
        console.log("Products migrated:", products.length);
        console.log("Migration completed successfully!");

        sqliteDb.close();
        await pgSequelize.close();
        process.exit(0);
      });
    });
  } catch (error) {
    console.error("Migration error:", error);
    process.exit(1);
  }
}

migrateData();
