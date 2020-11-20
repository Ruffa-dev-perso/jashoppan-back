/*
 * Model de user
 *
 */

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: String,
  quantity: Number,
  name: String,
  price: Number,
  imagexs: String,
});

const contactSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: {
    type: String,
    unique: true,
  },
  birthday: String,
  password: String,
  address: String,
  postcode: String,
  city: String,
  phone: String,
  cart: [productSchema],
});

module.exports = mongoose.model("User", contactSchema);
