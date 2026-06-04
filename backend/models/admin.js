const mongoose = require("mongoose");
const adminSchema = require("../schema/adminschema");

const admin = mongoose.model("admin", adminSchema);

module.exports = admin;
