const mongoose = require("mongoose");
const ringSchema = require("../schema/ringSchema");

const ladiesring = mongoose.model("ladiesring", ringSchema);

module.exports = ladiesring;