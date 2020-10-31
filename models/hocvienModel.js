const mongoose = require('mongoose');
const hocVienSchema = new mongoose.Schema({
    ten: {
        type: String,
        required: [true, 'Tên học viên không được để trống !'],
    },
    ngaySinh: {
        type: Date,
        required: [true, 'Ngày sinh không được để trống !'],
    },
    gioiTinh: {
        type: Boolean,
        required: [true, 'Giới tính không được để trống !'],
        default: false,
    },
    cmnd: {
        type: String,
        required: [true, 'CMND / CCCD / Hộ chiếu không được để trống !'],
    },
    gplx: {
        type: String,
    },
    loaiGplx: {
        type: String,
    },
    noiCapgplx: {
        type: String,
    },
    ngayCapgplx: {
        type: Date,
    },
    sdt: {
        type: String,
        default: null,
    },
    diaChi: {
        type: String,
        required: [true, 'Địa chỉ không được để trống !'],
    },
    quocTich: {
        type: String,
        required: [true, 'Quốc tịch không được để trống !'],
    },
    noiCapcmnd: {
        type: String,
        required: [true, 'Nơi cấp không được để trống !'],
    },
    noiDkhktt: {
        type: String,
        required: [true, 'Nơi đăng ký hộ khẩu thường trú không được để trống !'],
    },
    ngayCapcmnd: {
        type: Date,
        required: [true, 'Ngày cấp CMND / CCCD / Hộ chiếu không được để trống !'],
    },
    email: {
        type : String,
    },
    idLop: {
        type: mongoose.Schema.ObjectId,
        ref: 'LopHoc',
        default: null,
    },
    pending: {
        type: Boolean,
        default: true,
    },
    embedding: {
        type: String,
        default: null,
    },
    ngayTao: {
        type: Date,
        default: Date.now()
    },
    hasCmnd: {
        type: Boolean,
        default: false,
    },
    hasGksk: {
        type: Boolean,
        default: false,
    },
    hasSyll: {
        type: Boolean,
        default: false,
    },
    hasGplx: {
        type: Boolean,
        default: false,
    },
    hasAnh: {
        type: Boolean,
        default: false,
    },
    hasDongdangky: {
        type: Boolean,
        default: false
    },
    isPassLyThuyet: {
        type: Boolean,
        default: false,
    },
    ghiChu: {
        type: String,
    },
    ngayHen: {
        type: Date,
    },
    pickUpLocation: {
        type: String,
        default: null,
    }
})

hocVienSchema.method.getPending = function getPending(state){
    return hocVienSchema.find({pending : state}).exec((err, data) => {
        if(err) return err;
        else return data;
    })
}

const HocVien = mongoose.model('HocVien', hocVienSchema)
module.exports = HocVien;