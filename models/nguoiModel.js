const mongoose = require('mongoose');

const Nguoi = new mongoose.Schema({
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
    }
})

const Nguoi = mongoose.model('Nguoi', Nguoi)
module.exports = Nguoi;