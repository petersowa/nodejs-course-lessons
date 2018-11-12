const express = require('express');
const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/add-product', adminController.addProduct);
router.post('/product', adminController.submitProduct);
router.get('/edit-product', adminController.editProduct);
router.get('/product-list', adminController.showProducts);
router.get('/admin-products', adminController.adminProducts);

module.exports = router;
