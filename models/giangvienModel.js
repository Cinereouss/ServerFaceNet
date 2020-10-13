const mongoose = require('mongoose');

const GiangVien = new mongoose.Schema({
    ten : {
        type : String,
        required : [true, 'Tên giảng viên không được để trống !'],
    },
    embedding: {
        type: String,
        default: null,
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
    isbienche : {
        type : Boolean,
        default : 0
    }
})

const GiangVien = mongoose.model('GiangVien', GiangVien)
module.exports = GiangVien;