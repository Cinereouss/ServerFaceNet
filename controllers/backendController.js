const catchAsync = require('./../utils/catchAsync');

exports.showHomePage = (req, res, next) => {
    res.render('backend', {page: "home"})
}

exports.showPLHomePage = (req, res, next) => {
    res.render('frontend')
}

exports.showLoginPage = (req, res, next) => {
    res.render('authentic', {page : "login"})
}