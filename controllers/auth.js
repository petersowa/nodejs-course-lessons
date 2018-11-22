const User = require('../models/user');

module.exports = {
  getLogin(req, res, next) {
    //console.log(req.session.isLoggedIn);
    res.render('auth/login');
  },
  postLogin(req, res, next) {
    const { email, password } = req.body;
    //console.log(email, password, req.session.isLoggedIn);

    User.findById('5bf3812a02d28b4ac0041012')
      .then(user => {
        //console.log(user);
        req.session.isLoggedIn = true;
        req.session.user = user;
        console.log(user.getCart, req.session.user.getCart.toString());
        res.redirect('/');
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
};
