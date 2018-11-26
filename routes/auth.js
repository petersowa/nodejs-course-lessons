const express = require('express');

const authController = require('../controllers/auth');
const { guardRoute, notAuthRoute } = require('../middlewares/guard-route');

const router = express.Router();

router.get('/login', notAuthRoute, authController.getLogin);
router.get('/logout', guardRoute, authController.getLogout);
router.get('/signup', authController.getSignup);
router.post('/login', authController.postLogin);
router.post('/signup', authController.postSignup);
router.get('/reset-pw', authController.getResetPW);
router.post('/reset-pw', authController.postResetPW);
router.get('/change-pw/:token', authController.getChangePW);
router.post('/change-pw', authController.postChangePW);

module.exports = router;
