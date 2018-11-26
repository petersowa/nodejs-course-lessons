const guardRoute = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
};

const notAuthRoute = (req, res, next) => {
  if (!req.session.user) {
    next();
  } else {
    res.redirect('/');
  }
};

module.exports = { guardRoute, notAuthRoute };
