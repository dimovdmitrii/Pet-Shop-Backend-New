const Category = require("../database/models/category");
const Product = require("../database/models/product");
const express = require("express");
const router = express.Router();

router.get("/all", (req, res) => {
  async function all() {
    try {
      const all = await Category.findAll();
      res.json(all);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  }
  all();
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    res.json({ status: "ERR", message: "wrong id" });
    return;
  }

  try {
    const all = await Product.findAll({ where: { categoryId: +id } });
    const category = await Category.findOne({ where: { id: +id } });

    if (all.length === 0) {
      res.json({ status: "ERR", message: "empty category" });
      return;
    }

    res.json({
      category,
      data: all,
    });
  } catch (error) {
    console.error("Error fetching category products:", error);
    res.status(500).json({ error: "Failed to fetch category products" });
  }
});

module.exports = router;
