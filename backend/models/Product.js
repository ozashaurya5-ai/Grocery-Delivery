const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // 💰 Price PER UNIT (1 kg / 1 liter / 1 piece)
    price: {
      type: Number,
      required: true,
    },

    // 🔥 UNIT TYPE FOR GROCERY
    // kg  -> vegetables, fruits
    // liter -> milk, oil
    // piece -> packet items
    unitType: {
      type: String,
      enum: ["kg", "liter", "piece"],
      default: "piece",
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
