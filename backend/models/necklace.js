const mongoose = require("mongoose");
const necklaceSchema = require("../schema/necklaceSchema");

const necklace = mongoose.model("necklace", necklaceSchema);

module.exports = necklace;
