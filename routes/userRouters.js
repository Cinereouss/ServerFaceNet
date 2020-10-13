const express = require('express');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/sendsms', authController.sendMessage)
router.post('/confirm-phone', authController.verifyPhoneNumber)
router.post('/confirm-capcha', authController.handleCapcha)


module.exports = router;