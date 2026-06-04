const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    user_name: {
      type: String,
      required: true,
    },
    user_email: {
      type: String,
      required: true,
    },
    user_number: {
      type: String,
      required: true,
    },
    user_address: {
      type: String,
      required: true,
    },
    product_id: {
      type: String,
      required: true,
    },
    cart_item_id: {
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
      min: 1,
    },
    total_amount: {
      type: Number,
      required: true,
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
    status: {
      type: String,
      default: "Placed",
    },
  },
  { timestamps: true },
);

module.exports = orderSchema;
