const express = require('express');

const app = express();

app.use('/', (req, res, next) => {
  console.log('this always runs');
  next();
});

app.use('/add-product', (req, res, next) => {
  console.log('in another the middleware');
  res.send('<h1>Add Product</h1>');
});

app.use('/users', (req, res, next) => {
  const users = ['user1', 'user2', 'user3'];

  res.send(
    `<h1>Users</h1><ul>${users.reduce(
      (acc, user) => acc + '<li>' + user + '</li>',
      ''
    )}</ul>`
  );
});

app.use('/', (req, res, next) => {
  res.send('<h1>Hello 404</h1>');
});

app.listen(3100);
