const Product = require('../models/product');

module.exports = {
  async showIndex(req, res, next) {
    const products = await Product.find();
    res.render('shop/index', { products });
  },

  async showProducts(req, res, next) {
    const products = await Product.find();
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

  async showProductDetail(req, res, next) {
    const product = await Product.find({ _id: req.params.id });
    res.render('shop/product-detail', { product: product[0] });
  },
};
