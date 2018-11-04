const express = require('express');

const router = express.Router();

router.get('/add-product', (req, res, next) => {
  console.log('in another the middleware');
  res.send(
    '<h1>Add Product</h1><form action="/admin/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>'
  );
});

router.post('/product', (req, res, next) => {
  console.log('product submitted.', req.body);
  res.redirect('/');
});

router.use('/users', (req, res, next) => {
  const users = ['user1', 'user2', 'user3'];

  res.send(
    `<h1>Users</h1><ul>${users.reduce(
      (acc, user) => acc + '<li>' + user + '</li>',
      ''
    )}</ul>`
  );
});

module.exports = router;
