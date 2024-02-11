const express = require("express");
const router = express.Router();
const requireLogin = require("../middlewares/requireLogin");
const {
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/order");


router.get("/", getAllOrders);
router.post("/create", createOrder);
router.put("/update/:orderId", updateOrder);
router.delete("/delete/:orderId", deleteOrder);

module.exports = router;
