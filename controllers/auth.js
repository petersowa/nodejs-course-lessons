const User = require('../models/user');

module.exports = {
  getLogin(req, res, next) {
    //console.log(req.session.isLoggedIn);
    res.render('auth/login');
  },
  postLogin(req, res, next) {
    const { email, password } = req.body;
    //console.log(email, password, req.session.isLoggedIn);

    User.findById('5bf7057fc47d873d18606ffc')
      .then(user => {
        console.log('logging in user', user);
        req.session.isLoggedIn = true;
        req.session.user = user;
        req.session.save(err => {
          if (err) {
            res.redirect('/error/unable to save user: ' + err.msg);
          } else {
            res.redirect('/');
          }
        });
        //console.log(user.getCart, req.session.user.getCart.toString());
      })
      .catch(err => {
        res.redirect('/error/user not found: ' + err);
        console.log(err);
      });
  },
  getLogout(req, res, next) {
    //console.log('logout');
    req.session.isLoggedIn = false;
    res.redirect('/');
  },
  getSignup(req, res, next) {
    //console.log(req.session.isLoggedIn);
    res.render('auth/signup');
  },
};
