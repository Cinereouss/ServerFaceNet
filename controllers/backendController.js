const catchAsync = require('./../utils/catchAsync');

exports.showHomePage = (req, res, next) => {
    res.render('backend', {page: "home"})
}

