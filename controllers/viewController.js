const catchAsync = require('./../utils/catchAsync');

exports.showHomePage = (req, res, next) => {
    res.render('index', {page: "home"})
}

exports.showPLHomePage = (req, res, next) => {
    res.render('BEindex')
}
