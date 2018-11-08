const express = require('express');
const { addProduct, submitProduct } = require('../controllers/products');

const router = express.Router();

router.get('/add-product', addProduct);

router.post('/product', submitProduct);

module.exports = { router };
