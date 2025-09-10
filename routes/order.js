const express = require("express");
const router = express.Router();

router.get("/send", (req, res) => {
  res.json({ message: "Order endpoint is ready" });
});

router.post("/send", (req, res) => {
  try {
    const orderData = req.body;
    console.log("Order received:", orderData);

    // Здесь можно добавить логику сохранения заказа в базу данных
    // Например, создать таблицу Orders и сохранить данные

    res.json({
      status: "OK",
      message: "Order processed successfully",
      orderId: Date.now(), // Временный ID заказа
    });
  } catch (error) {
    console.error("Error processing order:", error);
    res.status(500).json({
      status: "ERROR",
      message: "Failed to process order",
    });
  }
});

module.exports = router;
