const Product = require('../models/product');

module.exports = {
  addProduct: (req, res, next) => {
    // console.log('in another the middleware');
    res.render('admin/add-product', { pageTitle: 'Add Product' });
  },

  submitProduct: (req, res, next) => {
    new Product(req.body.title).save();
    res.redirect('/');
  },

  showProducts: async (req, res, next) => {
    const products = await Product.fetchAll();
    res.render('admin/product-list', { products });
  },

  editProduct: async (req, res, next) => {
    const products = await Product.fetchAll();
    res.render('admin/edit-product', { products });
  },

  adminProducts: async (req, res, next) => {
    const products = await Product.fetchAll();
    res.render('admin/admin-products', { products });
  },
};

exports.version = 0.1;
