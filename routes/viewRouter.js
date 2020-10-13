const express = require('express');
const router = express.Router();
const frontendController = require('../controllers/frontendController');
const backendController = require('../controllers/backendController');

/************************
**      frontend       **
*************************/

router.route('/').get(frontendController.showHomePage);

router.route('/dangkyonline').get(frontendController.dangKyOnline);

/************************
**       backend       **
*************************/

router.route('/admin').get(backendController.showHomePage)

module.exports = router;
