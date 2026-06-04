const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    product_id: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    img_url: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
    },
    metal: {
      type: String,
    },
    purity: {
      type: String,
    },
    weight: {
      type: String,
    },
    stone: {
      type: String,
    },
    size: {
      type: mongoose.Schema.Types.Mixed,
    },
    making_charge: {
      type: String,
    },
  },
  { _id: true },
);

const cartSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
      unique: true,
    },
    items: {
      type: [cartItemSchema],
      default: [],
    },
  },
  { timestamps: true },
);

module.exports = cartSchema;
