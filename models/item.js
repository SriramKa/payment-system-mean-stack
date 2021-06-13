const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: "No description provided.",
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const itemModel = mongoose.model("item", itemSchema);

module.exports = itemModel;
