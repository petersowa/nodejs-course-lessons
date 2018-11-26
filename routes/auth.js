const express = require('express');

const authController = require('../controllers/auth');
const guardRoute = require('../middlewares/guard-route');

const router = express.Router();

router.get('/login', authController.getLogin);
router.get('/logout', guardRoute, authController.getLogout);
router.get('/signup', authController.getSignup);
router.post('/login', authController.postLogin);
router.post('/signup', authController.postSignup);
router.get('/reset-pw', authController.getResetPW);
router.post('/reset-pw', authController.postResetPW);

module.exports = router;
