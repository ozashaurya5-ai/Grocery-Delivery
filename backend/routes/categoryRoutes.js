const express = require("express");
const router = express.Router();

const {
  createCategory,
  getCategories,
  deleteCategory,
} = require("../controllers/categoryController");

const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

router.get("/", getCategories);
router.post("/", protect, admin, createCategory);
router.delete("/:id", protect, admin, deleteCategory);

module.exports = router;
