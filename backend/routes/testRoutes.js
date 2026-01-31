const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

router.get("/user", protect, (req, res) => {
  res.json({
    message: "User access OK",
    user: req.user,
  });
});

router.get("/admin", protect, admin, (req, res) => {
  res.json({
    message: "Admin access OK",
  });
});

module.exports = router;
