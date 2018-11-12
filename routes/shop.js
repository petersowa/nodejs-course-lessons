const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.showIndex);
router.get('/product-list', shopController.showProducts);
router.get('/cart', shopController.showCart);
router.get('/checkout', shopController.showCheckout);
router.get('/product-detail', shopController.showProductDetail);

module.exports = router;
