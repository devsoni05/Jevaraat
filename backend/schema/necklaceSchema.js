const mongoose = require("mongoose");

const necklaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  img_url: {
    type: String,
    required: true
  },
  metal: {
    type: String,
    required: true
  },
  purity: {
    type: String,
    required: true
  },
  weight: {
    type: String,
    required: true
  },
  stone: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  making_charge: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  
},{ timestamps: true });

module.exports = necklaceSchema;