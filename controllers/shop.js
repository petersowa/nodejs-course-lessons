const Product = require('../models/product');
const Order = require('../models/order');

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
      console.log(req.session.user.getCart);
      res.render('shop/cart', { cart: await req.user.getCart() });
    } catch (err) {
      console.log(err);
    }
  },

  async getOrders(req, res, next) {
    try {
      const foundOrders = await Order.find({ userRef: req.session.user });
      const popOrders = foundOrders.map(order => {
        return order
          .populate('userRef', 'name email')
          .populate('items.productRef', 'title price quantity')
          .execPopulate();
      });
      const orders = await Promise.all(popOrders);
      console.log({ orders });
      res.render('shop/orders', { orders });
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
    console.log('post add to cart product id', req.body.product);
    try {
      req.session.user
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

  getSubmitOrder(req, res, next) {
    req.session.user.submitOrder();
    res.redirect('/orders');
  },

  getClearCart(req, res, next) {
    req.session.user.clearCart();
    res.redirect('/cart');
  },
};
