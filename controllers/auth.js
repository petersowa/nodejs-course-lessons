const bcrypt = require('bcryptjs');

const mailer = require('nodemailer');
const SendGrid = require('nodemailer-sendgrid-transport');
const { mailerConfig } = require('../private/mailerConfig');

const User = require('../models/user');

const mailTransport = mailer.createTransport(
  SendGrid(mailerConfig.configSendGrid)
);

module.exports = {
  getLogin(req, res, next) {
    //console.log(req.session.isLoggedIn);
    res.render('auth/login');
  },
  postLogin(req, res, next) {
    const { email, password } = req.body;
    //console.log(email, password, req.session.isLoggedIn);

    User.findOne({ email })
      .then(user => {
        if (!user) {
          req.flash('error', 'Email address not found.');
          throw new Error('no user found.');
        }
        bcrypt.compare(password, user.password).then(auth => {
          if (auth) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            req.session.save(err => {
              if (err) {
                res.redirect('/error/unable to save user: ' + err.msg);
              } else {
                res.redirect('/');
              }
            });
          } else {
            res.redirect('/error/login credential mismatch');
          }
        });
        //console.log(user.getCart, req.session.user.getCart.toString());
      })
      .catch(err => {
        //res.redirect('/error/user not found: ' + err);
        res.redirect('/login');
        console.log(err);
      });
  },
  getLogout(req, res, next) {
    console.log('logout');
    req.session.isLoggedIn = false;
    req.session = null;
    res.redirect('/');
    //req.session.destroy(() => res.redirect('/'));
  },
  getSignup(req, res, next) {
    //console.log(req.session.isLoggedIn);
    res.render('auth/signup');
  },
  postSignup(req, res, next) {
    //console.log(req.session.isLoggedIn);
    const { name, email, password, confirm } = req.body;
    bcrypt.hash(password, 12).then(hash => {
      console.log('hashed pw is', hash);
      new User({ name, email, password: hash, cart: { items: [] } })
        .save()
        .then(data => {
          console.log('new user created', data);
          mailTransport
            .sendMail({
              to: 'test@devspeter.space',
              from: mailerConfig.from,
              subject: 'You are signed up on the shop',
              html: '<h1>Your account is created.</h1>',
            })
            .catch(err => {
              console.log('send mail error:', err);
            });
          res.redirect('/');
        })
        .catch(err => {
          res.redirect('/error/please verify email, may be duplicate');
        });
    });
    //res.redirect('/signup');
    //res.render('auth/signup');
  },
  getResetPW(req, res, next) {
    //console.log(req.session.isLoggedIn);
    res.render('auth/reset-pw');
  },
  postResetPW(req, res, next) {
    //console.log(req.session.isLoggedIn);
    const { email } = req.body;

    mailTransport
      .sendMail({
        to: 'test@devspeter.space',
        from: mailerConfig.from,
        subject: 'Password reset info',
        html: `<h1>Your password reset info for ${email}.</h1>`,
      })
      .catch(err => {
        console.log('send mail error:', err);
      });

    console.log('reset pw', email);

    res.redirect('/reset-pw');
    //res.render('auth/signup');
  },
};
