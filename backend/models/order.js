const mongoose = require("mongoose");
const orderSchema = require("../schema/orderSchema");

const order = mongoose.model("order", orderSchema);

module.exports = order;
