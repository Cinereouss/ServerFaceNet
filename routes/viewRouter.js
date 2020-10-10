const express = require('express');
const router = express.Router();
const frontendController = require('../controllers/frontendController');
const backendController = require('../controllers/backendController');

/************************
**      frontend       **
*************************/

router.route('/').get(frontendController.showHomePage);

router.route('/dangkyonline').get(frontendController.dangKyOnline);

router.route('/signin').get(frontendController.showLoginPage)
<<<<<<< HEAD

router.route('/signin').post(
  passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/',
    failureFlash: true
  })
);
=======
router.route('/signin').post();
>>>>>>> 1df3b2b721ca38f63ceb6705dbf2bbe16c26bc2b

router.route('/signup').get(frontendController.showSignUpPage);

router.route('/signup').post(frontendController.register);

/************************
**       backend       **
*************************/

router.route('/admin').get(backendController.showHomePage)

module.exports = router;
