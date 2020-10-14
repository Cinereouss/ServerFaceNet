const express = require('express');
const router = express.Router();
const frontendController = require('../controllers/frontendController');
const backendController = require('../controllers/backendController');
const authController = require('./../controllers/authController');

/************************
**      frontend       **
*************************/

router.route('/').get(frontendController.showHomePage);

router.route('/dangkyonline').get(frontendController.dangKyOnline);

router.route('/login').get(frontendController.showLoginPage);


/************************
**       backend       **
*************************/

router.route('/admin').get(authController.protect, authController.restrictTo("admin"), backendController.showHomePage);

module.exports = router;
