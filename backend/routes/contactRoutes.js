const express = require("express");
const router = express.Router();

const {
  sendMessage,
  getAllMessages,
} = require("../controllers/contactController");

const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

// USER (NO LOGIN REQUIRED)
router.post("/", sendMessage);

// ADMIN (LOGIN + ADMIN REQUIRED)
router.get("/", protect, admin, getAllMessages);

module.exports = router;
