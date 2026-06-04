const mongoose = require("mongoose");
const ringSchema = require("../schema/ringSchema");

const ring = mongoose.model("ring", ringSchema);

module.exports = ring;
