const express = require('express');
const attendanceController = require('./../controllers/attendanceController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
    .route('/')
    .post(
        authController.protect,
        authController.restrictTo('teacher'),
        attendanceController.upLoadAttendancePhoto('imageCheckIn'),
        attendanceController.checkIn
    )
    .patch(
        authController.protect,
        authController.restrictTo('teacher'),
        attendanceController.upLoadAttendancePhoto('imageCheckOut'),
        attendanceController.checkOut
    );

router
    .route('/seeding-fake-data')
    .get(attendanceController.checkServerConectionFromMobile)
    .post(attendanceController.seeding);


module.exports = router;