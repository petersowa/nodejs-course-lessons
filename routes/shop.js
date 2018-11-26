const express = require('express');

const shopController = require('../controllers/shop');
const { guardRoute } = require('../middlewares/guard-route');

const router = express.Router();

router.get('/', shopController.showIndex);
router.get('/product-list', shopController.showProducts);
router.get('/cart', guardRoute, shopController.showCart);
router.get('/checkout', guardRoute, shopController.showCheckout);
router.get('/product-detail/:id', shopController.showProductDetail);
router.post('/add-to-cart', guardRoute, shopController.postAddToCart);
router.get('/submit-order', guardRoute, shopController.getSubmitOrder);
router.get('/clear-cart', guardRoute, shopController.getClearCart);
router.get('/orders', guardRoute, shopController.getOrders);

module.exports = router;
