const products = [];

const addProduct = (req, res, next) => {
  // console.log('in another the middleware');
  res.render('add-product', { pageTitle: 'Add Product' });
};

const submitProduct = (req, res, next) => {
  // console.log('product submitted.', req.body);
  products.push(req.body.title);
  // console.log(products);

  res.redirect('/');
};

const showProducts = (req, res, next) => {
  res.render('shop', { products });
};

module.exports = { addProduct, submitProduct, showProducts, products };
