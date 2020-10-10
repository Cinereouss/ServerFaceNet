const express = require('express');
const passport = require('passport');
const router = express.Router();
const frontendController = require('../controllers/frontendController');
const backendController = require('../controllers/backendController');

/************************
**      frontend       **
*************************/

router.route('/').get(frontendController.showHomePage);

router.route('/dangkyonline').get(frontendController.dangKyOnline);

router.route('/signin').get(frontendController.showLoginPage)

router.route('/signin').post(
  passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/',
    failureFlash: true
  })
);

router.route('/signup').get(frontendController.showSignUpPage);

router.route('/signup').post(frontendController.register);

/************************
**       backend       **
*************************/

router.route('/admin').get(backendController.showHomePage)

module.exports = router;
