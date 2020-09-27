const catchAsync = require('./../utils/catchAsync');
const Attendance = require('../models/attendanceModel');
const FaceIdSchema = require('../models/faceIdModel')

exports.showHomePage = (req, res, next) => {
    res.render('index', {page: "home"})
}

// exports.showHocvienPage = (req, res, next) => {
//     res.render('index', {page: "hocvien"})
// }
//
// exports.showLichhenPage = (req, res, next) => {
//     res.render('index', {page: 'lichhen'});
// }
//
// exports.showRPTLDPage = (req, res, next) => {
//     res.render('index', {page: "tyledo"})
// }
//
// exports.showUserPage = (req, res, next) => {
//     res.render('index', {page: "user"})
// }
//
// exports.showDiemdanhPage = (req, res, next) => {
//     Attendance.find({})
//         .populate('idLearner')
//         .limit(12)
//         .sort({checkInAt: 'desc'})
//         .select({})
//         .exec((err, attend) => {
//         if(err){
//             res.json({
//                 erron : false
//             })
//         }else{
//             res.render("index", {page : "diemdanh", data : attend})
//         }
//     })
// }
