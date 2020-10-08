const express = require('express');
const passport = require('passport');
const router = express.Router();
const frontendController = require('../controllers/frontendController');
const backendController = require('../controllers/backendController');

router.route('/').get(backendController.showHomePage);

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

module.exports = router;
