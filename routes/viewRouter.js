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
router.route('/khoahoc').get(frontendController.showKhoaHocPage);
router.route('/tailieu').get(frontendController.showTaiLieuPage);
router.route('/tintuc').get(frontendController.showTinTucPage);
router.route('/hocphi').get(frontendController.showHocPhiPage);
router.route('/lienhe').get(frontendController.showLienHePage);
router.route('/khoahocB2').get(frontendController.showKhoaHocB2Page);
router.route('/xemaymoto').get(frontendController.showXeMayMoToPage);
router.route('/hockhac').get(frontendController.showHocKhacPage);
router.route('/B2tieuchuan').get(frontendController.showB2TieuChuanPage);
router.route('/B2dacbiet').get(frontendController.showB2DacBietPage);
router.route('/B2chithi').get(frontendController.showB2ChiThiPage);
router.route('/xesotudongB11').get(frontendController.showXeSoTuDongB11Page);
router.route('/laixeA1').get(frontendController.showLaiXeA1Page);
router.route('/motoA2').get(frontendController.showMoToA2Page);
router.route('/laixeA3').get(frontendController.showLaiXeA3Page);
router.route('/xetaiC').get(frontendController.showXeTaiCPage);
router.route('/thuexe').get(frontendController.showThueXePage);
router.route('/nanghang').get(frontendController.showNangHangPage);
router.route('/tailieulythuyet').get(frontendController.showTaiLieuLyThuyetPage);
router.route('/tailieuthuchanh').get(frontendController.showTaiLieuThucHanhPage);
router.route('/tintucoto').get(frontendController.showTinTucoToPage);
router.route('/tintuctrungtam').get(frontendController.showTinTucTrungTamPage);
router.route('/thugian').get(frontendController.showThuGianPage);
router.route('/menuhocphi').get(frontendController.showMeNuHocPhiPage);


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
