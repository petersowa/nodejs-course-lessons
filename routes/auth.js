const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);
router.get('/logout', authController.getLogout);
router.post('/login', authController.postLogin);

module.exports = router;
