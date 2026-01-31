const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const path = require("path");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use("/api/contact", require("./routes/contactRoutes"));

app.get("/", (req, res) => {
  res.send("Grocery Delivery API running...");
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
