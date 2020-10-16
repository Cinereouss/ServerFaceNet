const express = require('express');
const hocVienController = require('./../controllers/hocVienController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
    .route('/:id')
    .get(hocVienController.getStudentInfo)
    .patch(hocVienController.updateStudentEmbedding)

router.route('/setappointment').post(authController.protect, authController.restrictTo("admin"),hocVienController.setAppointment)

module.exports = router;