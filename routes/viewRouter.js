const express = require('express');
const router = express.Router();
const frontendController = require('../controllers/frontendController');
const backendController = require('../controllers/backendController');
const authController = require('./../controllers/authController');
const hocvienController = require('./../controllers/hocVienController');


/************************
**      frontend       **
*************************/

router.route('/').get(frontendController.showHomePage);

router.route('/dangkyonline')
    .get(frontendController.dangKyOnline)
    .post(hocvienController.dangKyOnline);

router.route('/login').get(frontendController.showLoginPage);
router.route('/gioithieu').get(frontendController.showGioiThieuPage);



/************************
**       backend       **
*************************/

router.route('/admin').get(authController.protect, authController.restrictTo("admin"), backendController.showHomePage);
router.route('/dondangkyonline').get(authController.protect, authController.restrictTo("admin"), backendController.showDondkoPage);
router.route('/profile/:id').get(authController.protect, authController.restrictTo("admin"), backendController.showProfilePage);
router.route('/student').get(authController.protect, authController.restrictTo("admin"), backendController.showAllStudentPage);
router.route('/lichhen').get(authController.protect, authController.restrictTo("admin"), backendController.showLichHenPage);
router.route('/diemdanh').get(authController.protect, authController.restrictTo("admin"), backendController.showDiemDanhPage);



module.exports = router;
