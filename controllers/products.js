const Product = require('../models/product');

const addProduct = (req, res, next) => {
  // console.log('in another the middleware');
  res.render('add-product', { pageTitle: 'Add Product' });
};

const submitProduct = (req, res, next) => {
  new Product(req.body.title).save();
  res.redirect('/');
};

const showProducts = async (req, res, next) => {
  const products = await Product.fetchAll();
  res.render('shop', { products });
};

module.exports = { addProduct, submitProduct, showProducts };
