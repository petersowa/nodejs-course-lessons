const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const { db_connect } = require('./database/config');
const User = require('./models/user');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const { pageNotFound } = require('./controllers/error');

const { mongoConnect } = require('./database/connect.js');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('5bf3812a02d28b4ac0041012')
    .then(user => {
      //console.log(user);
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.get('/error/:msg', (req, res, next) =>
  res.render('error', { msg: req.params.msg })
);
app.use(shopRoutes);

app.use(pageNotFound);

mongoose
  .connect(
    db_connect,
    { useNewUrlParser: true }
  )
  .then(result => {
    console.log('connected to db');
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Matt',
          email: 'matt@test.com',
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });

    app.listen(3100);
  })
  .catch(err => console.log('unable to connect via mongoose', err));

// mongoConnect()
//   .then(client => {
//     console.log('connected to db');
//     app.listen(3100);
//   })
//   .catch(err => console.log('unable to connect to mongodb', err));
