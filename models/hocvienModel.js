const mongoose = require('mongoose');

const HocVien = new mongoose.Schema({
    idNguoi : {
        type: mongoose.Schema.ObjectId,
        ref: 'Nguoi'
    },
    idLop : {
        type: mongoose.Schema.ObjectId,
        ref: 'LopHoc'
    },
    pending : {
        type : Boolean,
        default : 0
    },
    idface : {
        type : String
    },
    ngaytao : {
        type : Date,
        default : Date.now()
    },
    hascmnd : {
        type : Boolean,
        default : 0
    },
    hasgksk : {
        type : Boolean,
        default : 0
    },
    hassyll : {
        type : Boolean,
        default : 0
    },
    hasanh : {
        type : Boolean,
        default : 0
    },
    hasdongdangky : {
        type : Boolean,
        default : 0
    },
})

const HocVien = mongoose.model('HocVien', HocVien)
module.exports = HocVien;