const Category = require("../models/Category");

// =======================
// CREATE CATEGORY (ADMIN)
// =======================
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const exists = await Category.findOne({ name });
    if (exists) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = new Category({ name });
    const createdCategory = await category.save();

    res.status(201).json(createdCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// GET ALL CATEGORIES
// =======================
const getCategories = async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
};

// =======================
// DELETE CATEGORY (ADMIN)
// =======================
const deleteCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  await category.deleteOne();
  res.json({ message: "Category deleted" });
};

module.exports = {
  createCategory,
  getCategories,
  deleteCategory,
};
