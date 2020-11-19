const express = require('express');
const hocVienController = require('./../controllers/hocVienController');
const authController = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });

router
    .route('/')
    .get(hocVienController.getAllStudents);

router
    .route('/stats/:identity')
    .get(hocVienController.getStudentInfoByIdentity);

router
    .route('/register-face')
    .patch(hocVienController.updateStudentEmbedding);

router.route('/setappointment').post(authController.protect, authController.restrictTo("admin"),hocVienController.setAppointment)

router
    .route('/student-location/:id')
    .patch(hocVienController.updateStudentLocation);

router.route('/xeplop').post(authController.protect, authController.restrictTo("admin"),hocVienController.setLop)

router.route('/giayto').post(authController.protect, authController.restrictTo("admin"),hocVienController.giayto)

router.route('/getall').post(authController.protect, authController.restrictTo("admin"),hocVienController.getAll)

router.route('/setdiem').post(authController.protect, authController.restrictTo("admin"),hocVienController.setdiem)

module.exports = router;