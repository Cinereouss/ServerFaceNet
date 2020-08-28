const multer = require('multer');
const Attendance = require('../models/attendanceModel');
const catchAsync = require('./../utils/catchAsync');

// This function is for directly store image in local storage in ROM
const multerStorage = multer.diskStorage({
  // cb() is callback, like next() function
  // null is where we specify error
  destination: (req, file, cb) => {
    cb(null, 'public/img/attendance');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `user-${Date.now()}.${ext}`);
  }
});

const upload = multer({ storage: multerStorage });

exports.upLoadAttendancePhoto = upload.single('image'); // 'photo' is the field name from html form, 'single' image

exports.rollUp = catchAsync(async (req, res, next) => {
  const { idLearner, name, attemptAt } = req.body;
  const image = req.file.filename;
  const data = {
    idLearner,
    name,
    image,
    attemptAt
  };
  try {
    await Attendance.create(data);
    res.status(201).json({
      //201 Created
      status: 'success',
      message: 'Success attendance !'
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      // 400 Bad Request
      status: 'fail',
      message: 'Fail attendance !'
    });
  }
});
