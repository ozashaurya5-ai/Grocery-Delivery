const Review = require("../models/Review");
const Product = require("../models/Product");

// =======================
// USER → ADD REVIEW
// =======================
const addReview = async (req, res) => {
  try {
    const { rating, comment, productId } = req.body;

    // Prevent duplicate review
    const alreadyReviewed = await Review.findOne({
      user: req.user._id,
      product: productId,
    });

    if (alreadyReviewed) {
      return res
        .status(400)
        .json({ message: "You already reviewed this product" });
    }

    const review = await Review.create({
      user: req.user._id,
      product: productId,
      rating,
      comment,
    });

    // Update product rating
    const reviews = await Review.find({ product: productId });
    const avgRating =
      reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

    await Product.findByIdAndUpdate(productId, {
      rating: avgRating.toFixed(1),
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// USER → GET REVIEWS OF A PRODUCT
// =======================
const getProductReviews = async (req, res) => {
  const reviews = await Review.find({ product: req.params.productId })
    .populate("user", "name")
    .sort({ createdAt: -1 });

  res.json(reviews);
};

// =======================
// ADMIN → GET ALL REVIEWS
// =======================
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({})
      .populate("user", "name email")
      .populate("product", "name")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// ADMIN → REPLY TO REVIEW
// =======================
const replyReview = async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return res.status(404).json({ message: "Review not found" });
  }

  review.adminReply = req.body.reply;
  const updated = await review.save();

  res.json(updated);
};

module.exports = {
  addReview,
  getProductReviews,
  getAllReviews, // 🔥 IMPORTANT
  replyReview,
};
