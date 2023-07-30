const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter The Product or Service Name"],
  },
  price: {
    type: Number,
    required: [true, "Enter The Product or Service Price"],
  }
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;