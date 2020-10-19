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
    const hocvien = await HocVien.find({pending : true})
    res.render('backend', {page: "B_dondangky", pending: pending, hocvien: hocvien})
}

exports.showAllStudentPage = async (req, res, next) => {    
    const pending = await HocVien.find({pending : true})
    const hocvien = await HocVien.find({pending : false})
    res.render('backend', {page: "B_dondangky", pending: pending, hocvien: hocvien})
}

exports.showProfilePage = async (req, res, next) => {
    const hocvien = await HocVien.findById(req.params.id).populate({
        path : 'idLop', 
        populate : {
            path : 'idGiangVien idLoaiBang'
        }
    })
    const pending = await HocVien.find({pending : true})
    if(hocvien.embedding != null){
        const log = await Log.find({
            idHocvien : mongoose.Schema.Types.ObjectId(hocvien._id)
        });
        res.render('backend', {page: "B_profile", hocvien: hocvien, pending: pending, log: log});
    }else{
        res.render('backend', {page: "B_profile", hocvien: hocvien, pending: pending})
    }
}
exports.showLichHenPage = async (req, res, next) => {    
    const pending = await HocVien.find({pending : true})
    res.render('backend', {page: "B_lichhen", pending: pending})
}

exports.showDiemDanhPage = async (req, res, next) => {    
    const pending = await HocVien.find({pending : true})
    const log = await Log.find().populate('idHocVien')
    res.render('backend', {page: "B_diemdanh", pending: pending, log : log})
}