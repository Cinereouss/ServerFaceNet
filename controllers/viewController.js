// const catchAsync = require('./../utils/catchAsync');

exports.showHomePage = (req, res, next) => {
  res.render('index', {page : "home"})}

exports.showHocvienPage = (req, res, next) => {
    res.render('index', {page : "hocvien"})}