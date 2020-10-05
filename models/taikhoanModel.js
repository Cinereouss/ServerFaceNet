const mongoose = require('mongoose');

const TaiKhoan = new mongoose.Schema({
    idNguoi : {
        type: mongoose.Schema.ObjectId,
        ref: 'Nguoi'
    },
    username : {
        type : String,
        required : [true, 'Username không được để trống !'],
    },
    password : {
        type : String,
        required : [true, 'Password không được để trống !'],
    },
    createby : {
        type : String
    },
    createdate : {
        type : Date
    }
})

const TaiKhoan = mongoose.model('TaiKhoan', TaiKhoan)
module.exports = TaiKhoan;