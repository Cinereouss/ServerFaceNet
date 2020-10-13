const mongoose = require('mongoose');

const HocVien = new mongoose.Schema({
    ten : {
        type : String,
        required : [true, 'Tên giảng viên không được để trống !'],
    },
    embedding: {
        type: String,
        required: [true, 'Embedding can not be empty !']
    },
    ngaysinh : {
        type : Date,
        required : [true, 'Ngày sinh không được để trống !'],
    },
    gioitinh : {
        type: Boolean,
        default: 0
    },
    cmnd : {
        type : String,
        required : [true, 'CMND / CCCD / Hộ chiếu không được để trống !'],
    },
    sdt : {
        type : String,
    },
    diachi : {
        type : String,
        required : [true, 'Địa chỉ không được để trống !'],
    },
    email : {
        type : String,
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