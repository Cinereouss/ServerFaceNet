// const catchAsync = require('./../utils/catchAsync');

exports.showHomePage = (req, res, next) => {
  res.render('index', {page : "home"})}

exports.showHocvienPage = (req, res, next) => {
    res.render('index', {page : "hocvien"})}

exports.showLichhenPage = (req, res, next) => {
    res.render('index', {page : "lichhen"})}

exports.showRPTLDPage = (req, res, next) => {
    res.render('index', {page : "tyledo"})}

exports.showUserPage = (req, res, next) => {
    res.render('index', {page : "user"})}
