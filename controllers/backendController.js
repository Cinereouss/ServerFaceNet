const catchAsync = require('./../utils/catchAsync');
const HocVien = require('../models/hocvienModel')

exports.showHomePage = async (req, res, next) => {
    const pending = await HocVien.find({pending : true})
    res.render('backend', {page: "home", pending: pending})
}

exports.showDondkoPage = async (req, res, next) => {
    const pending = await HocVien.find({pending : true})
    res.render('backend', {page: "B_dondangky", pending: pending})
}

exports.showProfilePage = async (req, res, next) => {
    const hocvien = await HocVien.findById(req.params.id)
    const pending = await HocVien.find({pending : true})
    res.render('backend', {page: "B_profile", hocvien: hocvien, pending: pending})
}