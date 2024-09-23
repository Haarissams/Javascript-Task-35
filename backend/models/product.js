const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: String, required: true },
  product_name: { type: String, required: true },
  product_price: { type: Number, required: true },
  product_material: { type: String, required: true },
  product_color: { type: String, required: true }
});

module.exports = mongoose.model('Product', productSchema);
