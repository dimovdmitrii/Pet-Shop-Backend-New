const express = require("express");
const Product = require("../database/models/product");
const router = express.Router();

router.get("/all", (req, res) => {
  async function all() {
    try {
      const all = await Product.findAll();
      console.log("Products found:", all.length);
      res.json(all);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Failed to fetch products" });
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
    const product = await Product.findOne({ where: { id: +id } });

    if (!product) {
      res.json({ status: "ERR", message: "product not found" });
      return;
    }

    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

module.exports = router;
