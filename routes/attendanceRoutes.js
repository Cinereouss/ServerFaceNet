const express = require('express');
const attendanceController = require('./../controllers/attendanceController');

const router = express.Router();

router
  .route('/')
  .post(
    attendanceController.upLoadAttendancePhoto('imageCheckIn'),
    attendanceController.checkIn
  )
  .patch(
    attendanceController.upLoadAttendancePhoto('imageCheckOut'),
    attendanceController.checkOut
  );

module.exports = router;
