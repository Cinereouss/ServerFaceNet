const catchAsync = require('./../utils/catchAsync');
const HocVien = require('../models/hocvienModel')
const Log = require('../models/logModel')
const Lop = require('../models/lopModel')
const GiangVien = require('../models/giangvienModel')
const LoaiBang = require('../models/loaibangModel')

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
            idHocVien : hocvien._id
        });
        const bang = await LoaiBang.find({tenBang : hocvien.loaiGplx})
        const lop = await Lop.find({idLoaiBang : mongoose.Types.ObjectId(bang[0]._id)});
        res.render('backend', {page: "B_profile", hocvien: hocvien, pending: pending, log: log, lop : lop});
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

exports.showLopHocPage = async (req, res, next) => {    
    const pending = await HocVien.find({pending : true})
    const lop = await Lop.find().limit(8).sort([['khaiGiang', -1]]);
    const loaibang = await LoaiBang.find()
    const giangvien = await GiangVien.find()
    res.render('backend', {page: "B_lophoc", pending: pending, lop : lop, loaibang : loaibang, giangvien : giangvien})
}

exports.showLopHocInfoPage = async (req, res, next) => {    
    const pending = await HocVien.find({pending : true})
    const lop = await Lop.findById(req.params.id)
    const hocvien = await HocVien.find({idLop : lop._id})
    res.render('backend', {page: "B_lopprofile", pending: pending, lop : lop, hocvien : hocvien})
}