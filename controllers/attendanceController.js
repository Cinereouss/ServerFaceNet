// const multer = require('multer');
// const Attendance = require('../models/attendanceModel');
// const catchAsync = require('./../utils/catchAsync');
// const timeExtractor = require('./../utils/timeExtractor');
//
// // This function is for directly store image in local storage in ROM
// const multerStorage = multer.diskStorage({
//   // cb() is callback, like next() function
//   // null is where we specify error
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/attendance');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `user-${Date.now()}.${ext}`);
//   }
// });
//
// const upload = multer({ storage: multerStorage });
//
// exports.upLoadAttendancePhoto = imageField => upload.single(imageField); // 'imageField' is the field name from html form, 'single' image
//
// const calculateTotalTime = (checkInAt, checkOutAt) => {
//   // Invalid time: 7 - 11 && 13 - 18
//   const hourCI = timeExtractor(checkInAt).hour;
//   const minuteCI = timeExtractor(checkInAt).minute;
//   const secondCI = timeExtractor(checkInAt).second;
//   const dayCI = timeExtractor(checkInAt).day;
//   const monthCI = timeExtractor(checkInAt).month;
//   const yearCI = timeExtractor(checkInAt).year;
//
//   const hourCO = timeExtractor(checkOutAt).hour;
//   const minuteCO = timeExtractor(checkOutAt).minute;
//   const secondCO = timeExtractor(checkOutAt).second;
//   const dayCO = timeExtractor(checkOutAt).day;
//   const monthCO = timeExtractor(checkOutAt).month;
//   const yearCO = timeExtractor(checkOutAt).year;
//
//   // Check differences in day, month, year
//   if (`${dayCI}${monthCI}${yearCI}` !== `${dayCO}${monthCO}${yearCO}`) {
//     return 0;
//   }
//
//   // Check-in in morning, check-out in afternoon
//   if (hourCI >= 7 && hourCI <= 10 && hourCO >= 14 && hourCO <= 17) {
//     return 0;
//   }
//
//   return (
//     hourCO * 60 * 60 +
//     minuteCO * 60 +
//     secondCO -
//     (hourCI * 60 * 60 + minuteCI * 60 + secondCI)
//   );
// };
//
// exports.checkIn = catchAsync(async (req, res, next) => {
//   const { idLearner, checkInAt } = req.body;
//   const imageCheckIn = req.file.filename;
//
//   //TODO: Check clock to response "Check in not available at that moment"
//
//   const data = {
//     idLearner,
//     imageCheckIn,
//     checkInAt
//   };
//
//   try {
//     const newAttendance = await Attendance.create(data);
//     res.status(201).json({
//       //201 Created
//       status: 'success',
//       message: 'Success check in !',
//       id: newAttendance._id
//     });
//   } catch (err) {
//     res.status(400).json({
//       // 400 Bad Request
//       status: 'fail',
//       message: 'Fail check in !'
//     });
//   }
// });
//
// exports.checkOut = catchAsync(async (req, res, next) => {
//   const { id, checkOutAt } = req.body;
//   const imageCheckOut = req.file.filename;
//
//   // TODO: Check clock to response "Check out not available at that moment"
//
//   try {
//     const attendanceInfo = await Attendance.findById(id);
//
//     const totalTime = calculateTotalTime(attendanceInfo.checkInAt, checkOutAt);
//
//     const data = {
//       checkOutAt,
//       imageCheckOut,
//       totalTime
//     };
//
//     try {
//       await Attendance.findByIdAndUpdate(id, data);
//
//       res.status(200).json({
//         status: 'success',
//         message: 'Success check out !',
//         totalTime: totalTime
//       });
//     } catch (err) {
//       res.status(404).json({
//         status: 'fail',
//         message: err
//       });
//     }
//   } catch (err) {
//     res.status(404).json({
//       status: 'fail',
//       message: 'You did not check in before !'
//     });
//   }
// });
