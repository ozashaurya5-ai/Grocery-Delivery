const express = require("express");
const router = express.Router();

const {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  getDashboardStats,
} = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

// USER
router.post("/", protect, placeOrder);
router.get("/my", protect, getMyOrders);

// ADMIN
router.get("/", protect, admin, getAllOrders);
router.put("/:id", protect, admin, updateOrderStatus);
router.get("/dashboard/stats", protect, admin, getDashboardStats);

module.exports = router;
