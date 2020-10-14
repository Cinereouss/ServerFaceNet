const mongoose = require('mongoose');

const giangVienSchema = new mongoose.Schema({
    ten: {
        type: String,
        required: [true, 'Tên giảng viên không được để trống !'],
    },
    embedding: {
        type: String,
        default: null,
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
    sdt: {
        type: String,
        required: [true, 'Số điện thoại không được để trống !'],
    },
    diaChi: {
        type: String,
        required: [true, 'Địa chỉ không được để trống !'],
    },
    email: {
        type: String,
        required: [true, 'Email không được để trống !'],
    },
    isBienChe: {
        type: Boolean,
        default: false,
    },
    account: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        default: null,
    }
})

const GiangVien = mongoose.model('GiangVien', giangVienSchema)
module.exports = GiangVien;