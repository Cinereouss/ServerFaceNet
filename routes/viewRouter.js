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
router.route('/tracuu').get(frontendController.showTraCuuPage);
router.route('/cachthucdangky').get(frontendController.showCachThucDangKyPage);

/************************
**       backend       **
*************************/

router.route('/admin').get(authController.protect, authController.restrictTo("admin"), backendController.showHomePage);
router.route('/dondangkyonline').get(authController.protect, authController.restrictTo("admin"), backendController.showDondkoPage);
router.route('/profile/:id').get(authController.protect, authController.restrictTo("admin"), backendController.showProfilePage);
router.route('/student').get(authController.protect, authController.restrictTo("admin"), backendController.showAllStudentPage);
router.route('/dahen').get(authController.protect, authController.restrictTo("admin"), backendController.showDaHenPage);
router.route('/luutru').get(authController.protect, authController.restrictTo("admin"), backendController.showLuuTruPage);
router.route('/choxeplop').get(authController.protect, authController.restrictTo("admin"), backendController.showXepLopPage);
router.route('/lichhen').get(authController.protect, authController.restrictTo("admin"), backendController.showLichHenPage);
router.route('/diemdanh').get(authController.protect, authController.restrictTo("admin"), backendController.showDiemDanhPage);
router.route('/lophoc').get(authController.protect, authController.restrictTo("admin"), backendController.showLopHocPage);
router.route('/lophoc/profile/:id').get(authController.protect, authController.restrictTo("admin"), backendController.showLopHocInfoPage);
router.route('/lophoc/info/:id').get(authController.protect, authController.restrictTo("admin"), backendController.showLopHocInfo2Page);
router.route('/vechungtoi').get(authController.protect, authController.restrictTo("admin"), backendController.showInfoPage);
router.route('/loaibang').get(authController.protect, authController.restrictTo("admin"), backendController.showLoaiBangPage);
router.route('/thongkehocvien').get(authController.protect, authController.restrictTo("admin"), backendController.showTkHocVienPage);
router.route('/thongkegiangvien').get(authController.protect, authController.restrictTo("admin"), backendController.showTkGiangVienPage);
router.route('/contact').get(authController.protect, authController.restrictTo("admin"), backendController.showContactPage);
router.route('/stop').get(authController.protect, authController.restrictTo("admin"), backendController.showStopPage);
router.route('/thongtintaikhoan/:id').get(authController.protect, authController.restrictTo("admin"), backendController.showTttkPage);
router.route('/taotaikhoan').get(authController.protect, authController.restrictTo("admin"), backendController.showTTKPage);
router.route('/role').get(authController.protect, authController.restrictTo("admin"), backendController.showRolePage);
router.route('/authencation').get(authController.protect, authController.restrictTo("admin"), backendController.showAuthPage);
module.exports = router;
