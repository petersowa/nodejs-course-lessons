const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const { pageNotFound } = require('./controllers/error');

const { mongoConnect } = require('./database/connect.js');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(pageNotFound);

mongoConnect()
  .then(client => {
    console.log('connected to db');
    app.listen(3100);
  })
  .catch(err => console.log('unable to connect to mongodb', err));
