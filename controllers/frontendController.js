const catchAsync = require('./../utils/catchAsync');

const User = require('../models/userModel')
exports.showPLHomePage = (req, res, next) => {
    res.render('frontend')
}

exports.showLoginPage = (req, res, next) => {
    res.render('authentic', {page : "login"})
}

exports.showSignUpPage = (req, res, next) => {
    res.render('authentic', {page : "signup"})
}

exports.dangKyOnline = (req, res, next) => {
    res.render('frontend', {page : "F_dangkyonline"})
}

exports.register = (req, res, next) => {
}