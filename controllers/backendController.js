const catchAsync = require('./../utils/catchAsync');
const HocVien = require('../models/hocvienModel')
const Log = require('../models/logModel')
const Lop = require('../models/lopModel')
const GiangVien = require('../models/giangvienModel')
const LoaiBang = require('../models/loaibangModel')
const Contact = require('../models/contactModel')
const Users = require('../models/userModel')
const Role = require('../models/groupModel')

const mongoose = require('mongoose');
const User = require('../models/userModel');
const e = require('express');

exports.showHomePage = async (req, res, next) => {
    const pending = await HocVien.find({pending : true})
    var log = await Log.find().populate('idHocVien')
    res.render('backend', {page: "home", pending: pending, log : log})
}

exports.showDondkoPage = async (req, res, next) => {    
    const pending = await HocVien.find({pending : true})
    var hocvien = await HocVien.find({status : 1})
    res.render('backend', {page: "B_dondangky", pending: pending, hocvien: hocvien})
}

exports.showAllStudentPage = async (req, res, next) => {    
    const pending = await HocVien.find({pending : true})
    var hocvien = await HocVien.find({status : 4})
    res.render('backend', {page: "B_dondangky", pending: pending, hocvien: hocvien})
}

exports.showDaHenPage = async (req, res, next) => {    
    const pending = await HocVien.find({pending : true})
    var hocvien = await HocVien.find({status : 2})
    res.render('backend', {page: "B_dondangky", pending: pending, hocvien: hocvien})
}

exports.showXepLopPage = async (req, res, next) => {    
    const pending = await HocVien.find({pending : true})
    var hocvien = await HocVien.find({status : 3})
    res.render('backend', {page: "B_dondangky", pending: pending, hocvien: hocvien})
}

exports.showProfilePage = async (req, res, next) => {
    var hocvien = await HocVien.findById(req.params.id).populate({
        path : 'idLop', 
        populate : {
            path : 'idGiangVien idLoaiBang'
        }
    })
    const pending = await HocVien.find({pending : true})
    if(hocvien.embedding != null){
        var log = await Log.find({
            idHocVien : hocvien._id
        });
        var bang = await LoaiBang.find({tenBang : hocvien.loaiGplx})
        var lop = await Lop.find({idLoaiBang : mongoose.Types.ObjectId(bang[0]._id)});
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
    var log = await Log.find().populate('idHocVien')
    res.render('backend', {page: "B_diemdanh", pending: pending, log : log})
}

exports.showLopHocPage = async (req, res, next) => {    
    const pending = await HocVien.find({pending : true})
    var lop = await Lop.find().limit(8).sort([['khaiGiang', -1]]);
    var loaibang = await LoaiBang.find()
    var giangvien = await GiangVien.find()
    res.render('backend', {page: "B_lophoc", pending: pending, lop : lop, loaibang : loaibang, giangvien : giangvien})
}

exports.showLopHocInfoPage = async (req, res, next) => {    
    const pending = await HocVien.find({pending : true})
    var lop = await Lop.findById(req.params.id)
    var hocvien = await HocVien.find({idLop : lop._id})
    res.render('backend', {page: "B_lopprofile", pending: pending, lop : lop, hocvien : hocvien})
}

exports.showInfoPage = async (req, res, next) => {    
    const pending = await HocVien.find({pending : true})
    res.render('backend', {page: "B_about", pending: pending})
}

exports.showLoaiBangPage = async (req, res, next) => {    
    const pending = await HocVien.find({pending : true})
    var bang = await LoaiBang.find()
    res.render('backend', {page: "B_loaibang", pending: pending, bang : bang})
}

exports.showTkHocVienPage = async (req, res, next) => {    
    const pending = await HocVien.find({pending : true})
    res.render('backend', {page: "B_tkhocvien", pending: pending})
}

exports.showTkGiangVienPage = async (req, res, next) => {    
    const pending = await HocVien.find({pending : true})
    var giangvien = await GiangVien.find().populate('account')
    res.render('backend', {page: "B_tkgiangvien", pending: pending, giangvien : giangvien})
}

exports.showContactPage = async (req, res, next) => {    
    const pending = await HocVien.find({pending : true})
    var contact = await Contact.findOne()
    res.render('backend', {page: "B_contact", pending: pending, contact : contact})
}

exports.showStopPage = async (req, res, next) => {    
    const pending = await HocVien.find({pending : true})
    res.render('backend', {page: "B_stop", pending: pending})
}

exports.showLopHocInfo2Page = async (req, res, next) => {    
    const pending = await HocVien.find({pending : true})
    var lop = await Lop.findById(req.params.id)
    var hocvien = await HocVien.find({idLop : lop._id})
    var hocviendk = await HocVien.find({idLop : lop._id, status : 5})
    res.render('backend', {page: "B_lopinfo", pending: pending, lop : lop, hocvien : hocvien, hocvien2 : hocviendk})
}

exports.showTttkPage = async (req, res, next) => {    
    const pending = await HocVien.find({pending : true})
    if(req.params.id == -1){
        var data = await Users.find({role : "teacher"})

        res.render('backend', {page: "B_tttk", pending: pending, data : data})
    }else{
        var user = await User.findById(req.params.id)
        if(user.role == "admin"){
            var data = await Users.find({role : "teacher"})
            res.render('backend', {page: "B_tttk", pending: pending, user : user, data : data})
        }else{
            var giangvien4 = await GiangVien.find({ten : user.name})
                var data = []
                if (giangvien4[0]){
                    data = await Lop.find({idGiangVien : mongoose.Types.ObjectId(giangvien4[0]._id)})
                }
            res.render('backend', {page: "B_tttk", pending: pending, user : user, data : data})
        }
        
    }
}

exports.showTTKPage = async (req, res, next) => {    
    const pending = await HocVien.find({pending : true})
    var role = await Role.find()
    res.render('backend', {page: "B_createuser", pending: pending, role : role})
}

exports.showRolePage = async (req, res, next) => {    
    const pending = await HocVien.find({pending : true})
    var role = await Role.find()
    var user = await Users.find()
    res.render('backend', {page: "B_role", pending: pending, user : user, role : role})
}