const Product = require("../models/Product");

// =======================
// CREATE PRODUCT
// =======================
const createProduct = async (req, res) => {
  try {
    const { name, price, unitType, description, category } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const product = new Product({
      name,
      price,
      unitType,
      description,
      category,
      image: `/uploads/${req.file.filename}`,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// =======================
// GET PRODUCTS
// =======================
const getProducts = async (req, res) => {
  const products = await Product.find({}).populate("category", "name");
  res.json(products);
};

// =======================
// UPDATE PRODUCT ✅ FIXED
// =======================
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 🔥 SAFE ASSIGN (FormData ke liye)
    if (req.body.name) product.name = req.body.name;
    if (req.body.price) product.price = req.body.price;
    if (req.body.unitType) product.unitType = req.body.unitType;
    if (req.body.description) product.description = req.body.description;
    if (req.body.category) product.category = req.body.category;

    // image optional
    if (req.file) {
      product.image = `/uploads/${req.file.filename}`;
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// =======================
// DELETE PRODUCT
// =======================
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
