const express = require('express');
const router = express.Router();
const frontendController = require('../controllers/frontendController');
const backendController = require('../controllers/backendController');

router.route('/').get(backendController.showHomePage);

router.route('/signin').get(frontendController.showLoginPage)
router.route('/signin').post();

router.route('/signup').get(frontendController.showSignUpPage);

router.route('/signup').post(frontendController.register);

module.exports = router;
