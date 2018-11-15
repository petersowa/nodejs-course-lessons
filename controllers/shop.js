const Product = require('../models/product');

module.exports = {
  async showIndex(req, res, next) {
    const products = await Product.fetchAll();
    res.render('shop/index', { products });
  },

  async showProducts(req, res, next) {
    const products = await Product.fetchAll();
    res.render('shop/product-list', { products });
  },

  async showCart(req, res, next) {
    const products = await Product.fetchAll();
    res.render('shop/cart', { products });
  },

  async showCheckout(req, res, next) {
    const products = await Product.fetchAll();
    res.render('shop/checkout', { products });
  },

  showProductDetail(req, res, next) {
    res.render('shop/product-detail', { id: req.params.id });
  },
};
