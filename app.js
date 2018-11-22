const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const { db_connect } = require('./database/config');

const User = require('./models/user');

const app = express();
const store = new MongoDBStore({ uri: db_connect, collection: 'sessions' });

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const { pageNotFound } = require('./controllers/error');

//const { mongoConnect } = require('./database/connect.js');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'yabba dabba doo!!!',
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use((req, res, next) => {
  if (req.session.user) {
    console.log('logged in', req.session.user);
    User.findById(req.session.user._id).then(user => {
      console.log('found user', user);
      req.user = user;
      next();
    });
  } else {
    console.log('logged out');
    next();
  }
});

app.use('/admin', adminRoutes);
app.get('/error/:msg', (req, res, next) =>
  res.render('error', { msg: req.params.msg })
);
app.use(shopRoutes);
app.use(authRoutes);

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
          password: 'testpw',
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
