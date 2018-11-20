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
    try {
      res.render('shop/cart', { cart: await req.user.getCart() });
    } catch (err) {
      console.log(err);
    }
  },

  async showCheckout(req, res, next) {
    res.render('shop/checkout', { products });
  },

  async showProductDetail(req, res, next) {
    const product = await Product.findOne({ _id: req.params.id });
    res.render('shop/product-detail', { product });
  },

  postAddToCart(req, res, next) {
    console.log(req.body.product);
    try {
      req.user
        .addToCart(req.body.product)
        .then(r => res.redirect('/cart'))
        .catch(err => {
          console.log(err);
          res.redirect('/');
        });
    } catch (err) {
      res.redirect('/error/' + 'unable to add to cart');
    }
  },
};
