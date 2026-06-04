const mongoose = require("mongoose");
const goldbarSchema = require("../schema/goldbarSchema");

const goldbar = mongoose.model("goldbar", goldbarSchema);

module.exports = goldbar;
