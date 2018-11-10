const express = require('express');
const productsController = require('../controllers/products');

const router = express.Router();

router.get('/add-product', productsController.addProduct);

router.post('/product', productsController.submitProduct);

module.exports = router;
