const express = require('express');
const attendanceController = require('./../controllers/attendanceController');

const router = express.Router();

router
  .route('/')
  .post(
    attendanceController.upLoadAttendancePhoto,
    attendanceController.rollUp
  );

module.exports = router;
