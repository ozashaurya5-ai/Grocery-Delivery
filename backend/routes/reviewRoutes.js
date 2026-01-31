const express = require("express");
const router = express.Router();

const {
  addReview,
  getProductReviews,
  replyReview,
  getAllReviews, // 🔥 NEW
} = require("../controllers/reviewController");

const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

// USER
router.post("/", protect, addReview);
router.get("/:productId", getProductReviews);

// ADMIN
router.get("/", protect, admin, getAllReviews); // 🔥 IMPORTANT
router.put("/:id/reply", protect, admin, replyReview);

module.exports = router;
