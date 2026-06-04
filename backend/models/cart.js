const mongoose = require("mongoose");
const cartSchema = require("../schema/cartSchema");

const cart = mongoose.model("cart", cartSchema);

module.exports = cart;
