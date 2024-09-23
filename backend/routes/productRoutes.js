const express = require('express');
const Product = require('../models/product');
const router = express.Router();

// 1. Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
    console.log(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. Get products with price between 400 and 800
router.get('/price-range', async (req, res) => {
  try {
    const products = await Product.find({ product_price: { $gte: 400, $lte: 800 } });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 3. Get products not between 400 and 600
router.get('/price-not-range', async (req, res) => {
  try {
    const products = await Product.find({ product_price: { $not: { $gte: 400, $lte: 600 } } });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 4. Get four products greater than 500 in price
router.get('/top-price', async (req, res) => {
  try {
    const products = await Product.find({ product_price: { $gt: 500 } }).limit(4);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 5. Get product name and material
router.get('/name-material', async (req, res) => {
  try {
    const products = await Product.find({}, { product_name: 1, product_material: 1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 6. Get product by row ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 7. Get only product name and material
router.get('/simple', async (req, res) => {
  try {
    const products = await Product.find({}, { product_name: 1, product_material: 1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 8. Get products with "Soft" in material
router.get('/material/soft', async (req, res) => {
  try {
    const products = await Product.find({ product_material: "Soft" });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 9. Get products with color "indigo" and price 492
router.get('/indigo-price', async (req, res) => {
  try {
    const products = await Product.find({ product_color: "indigo", product_price: 492 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 10. Delete products with price 28
router.delete('/delete-price-28', async (req, res) => {
  try {
    const result = await Product.deleteMany({ product_price: 28 });
    res.json({ message: 'Products with price 28 deleted', result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
