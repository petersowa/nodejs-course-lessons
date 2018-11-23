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

const { protected } = require('./middlewares/protected');

//const { mongoConnect } = require('./database/connect.js');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

// Catch errors
store.on('error', function(error) {
  assert.ifError(error);
  assert.ok(false);
});
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'yabba dabba doo!!!',
    resave: false,
    saveUninitialized: false,
    store: store,
    unset: 'destroy',
  })
);

app.use((req, res, next) => {
  if (req.session.user) {
    console.log('logged in', req.session.user.name);
    User.findById(req.session.user._id).then(user => {
      //console.log('found user', user);
      req.user = user;
      next();
    });
  } else {
    console.log('logged out');
    next();
  }
});

app.use('/admin', protected, adminRoutes);
app.get('/error/:msg', (req, res, next) =>
  res.render('error', { msg: req.params.msg })
);
app.use(shopRoutes);
app.use(authRoutes);

app.use(pageNotFound);

mongoose.set('useCreateIndex', true);
mongoose
  .connect(
    db_connect,
    { useNewUrlParser: true }
  )
  .then(client => {
    console.log('connected to db');
    app.listen(3100);
  })
  .catch(err => console.log('unable to connect via mongoose', err));

// mongoConnect()
//   .then(client => {
//     console.log('connected to db');
//     app.listen(3100);
//   })
//   .catch(err => console.log('unable to connect to mongodb', err));
