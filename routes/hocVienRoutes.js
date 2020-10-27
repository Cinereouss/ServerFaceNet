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

module.exports = router;