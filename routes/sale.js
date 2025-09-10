const express = require("express");
const Product = require("../database/models/product");
const router = express.Router();

router.get("/send", (req, res) => {
  async function getSaleProducts() {
    try {
      const saleProducts = await Product.findAll({
        where: {
          discont_price: { [require("sequelize").Op.ne]: null },
        },
      });
      res.json(saleProducts);
    } catch (error) {
      console.error("Error fetching sale products:", error);
      res.status(500).json({ error: "Failed to fetch sale products" });
    }
  }
  getSaleProducts();
});

router.post("/send", (req, res) => {
  res.json({ status: "OK", message: "request processed" });
});

module.exports = router;
