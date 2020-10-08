const catchAsync = require('./../utils/catchAsync');
const User = require('../models/User')
exports.showPLHomePage = (req, res, next) => {
    res.render('frontend')
}

exports.showLoginPage = (req, res, next) => {
    res.render('authentic', {page : "login"})
}

exports.showSignUpPage = (req, res, next) => {
    res.render('authentic', {page : "signup"})
}

exports.register = (req, res, next) => {
    if(User.uniqueUser(req.body.username)){
        var newUser = new User;
        User.email = req.body.email;
        User.username = req.body.username;
        User.password = User.encryptPassword(req.body.username);
        newUser.save()
    }else{
        return false;
    }
}