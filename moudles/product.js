const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: {
    filename: String,
    url: String,
  },
  subImages:[String],
  price: Number,
  category: String,
  colors: [String],
  sizes: [String],
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
