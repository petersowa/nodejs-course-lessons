const express = require('express');
const adminController = require('../controllers/admin');
const { guardRoute } = require('../middlewares/guard-route');

const router = express.Router();

router.get('/add-product', adminController.addProduct);
router.post('/product', adminController.submitProduct);
router.post('/delete-product', adminController.deleteProduct);
router.post('/edit-product', adminController.editProduct);
router.get('/product-list', adminController.showProducts);
router.get('/admin-products', adminController.adminProducts);

module.exports = router;
