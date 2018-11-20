const Product = require('../models/product');

module.exports = {
  addProduct: (req, res, next) => {
    // console.log('in another the middleware');
    res.render('admin/add-product', { pageTitle: 'Add Product' });
  },

  submitProduct: (req, res, next) => {
    const { title, description, imageURL, price, id } = req.body;
    console.log(id);
    if (!id) {
      new Product({ title, description, imageURL, price, userId: req.user._id })
        .save()
        .then(data => {
          //console.log(data);
          res.redirect('/');
        })
        .catch(err => console.log(err));
    } else {
      Product.findByIdAndUpdate(id, { title, description, imageURL, price })
        .then(data => {
          console.log('product updated');
          res.redirect('/');
        })
        .catch(err => console.log(err));
    }
  },

  deleteProduct: (req, res, next) => {
    const { id } = req.body;
    //console.log('delete', key);
    Product.findByIdAndDelete(id)
      .then(() => {
        //console.log('deleted item');
        res.redirect('/admin/admin-products');
      })
      .catch(err => console.log(err));
  },

  showProducts: async (req, res, next) => {
    const products = await Product.find();
    res.render('admin/product-list', { products });
  },

  editProduct: async (req, res, next) => {
    const { id } = req.body;
    try {
      const product = await Product.findById(id);
      res.render('admin/edit-product', { product });
    } catch (err) {
      console.log(err);
    }
  },

  adminProducts: async (req, res, next) => {
    const products = await Product.find();
    res.render('admin/admin-products', { products });
  },
};

exports.version = 0.1;
