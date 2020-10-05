// const FaceId = require("./../models/faceIdModel");
// const catchAsync = require("./../utils/catchAsync");
//
// exports.registerNewFaceId = catchAsync(async (req, res, next) => {
//   const { idLearner, name, embedding } = req.body;
//
//   try {
//     await FaceId.create({ idLearner, name, embedding });
//
//     res.status(201).json({
//       //201 Created
//       status: "success",
//       message: "Register successfully new Face Id !",
//     });
//   } catch (err) {
//     res.status(400).json({
//       // 400 Bad Request
//       status: "fail",
//       message: "Register new Face Id failed !",
//     });
//   }
// });
//
// exports.getFaceIdData = catchAsync(async (req, res, next) => {
//   const faceIdData = await FaceId.find({}).select("idLearner name embedding");
//
//   res.status(200).json({
//     //200 Ok
//     faceIdData,
//   });
// });
