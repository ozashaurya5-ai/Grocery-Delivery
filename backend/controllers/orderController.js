const Order = require("../models/Order");

// =======================
// PLACE ORDER (USER)
// =======================
const placeOrder = async (req, res) => {
  try {
    const { orderItems, totalPrice, shippingAddress } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    if (
      !shippingAddress ||
      !shippingAddress.fullName ||
      !shippingAddress.phone ||
      !shippingAddress.street ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.pincode
    ) {
      return res.status(400).json({ message: "Complete address required" });
    }

    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// GET MY ORDERS (USER)
// =======================
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 }) // 🔥 NEWEST FIRST
      .populate("orderItems.product", "name image price");

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// GET ALL ORDERS (ADMIN)
// =======================
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .sort({ createdAt: -1 }) // 🔥 NEWEST FIRST
      .populate("user", "name email")
      .populate("orderItems.product", "name image price");

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// UPDATE ORDER STATUS (ADMIN)
// =======================
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = req.body.status || order.status;
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// DASHBOARD STATS (ADMIN)
// =======================
const getDashboardStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: "Pending" });
    const completedOrders = await Order.countDocuments({ status: "Completed" });

    const income = await Order.aggregate([
      { $match: { status: "Completed" } },
      { $group: { _id: null, total: { $sum: "$totalPrice" } } },
    ]);

    res.json({
      totalOrders,
      pendingOrders,
      completedOrders,
      totalIncome: income[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  getDashboardStats,
};
