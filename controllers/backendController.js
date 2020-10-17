const catchAsync = require('./../utils/catchAsync');
const HocVien = require('../models/hocvienModel')
const Log = require('../models/logModel')
const Lop = require('../models/lopModel')

const mongoose = require('mongoose')

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
    if(hocvien.embedding != null){
        const log = await Log.find({
            idHocvien : mongoose.Schema.Types.ObjectId(hocvien._id)
        });
        const lop = await Lop.findById(hocvien.idLop)
        console.log(log)
        res.render('backend', {page: "B_profile", hocvien: hocvien, pending: pending, log: log, lop: lop});
    }else{
        res.render('backend', {page: "B_profile", hocvien: hocvien, pending: pending})
    }

}