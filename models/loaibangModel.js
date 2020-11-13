const mongoose = require('mongoose');

const loaiBangLaiSchema = new mongoose.Schema({
    tenBang: {
        type: String,
        required: [true, 'Tên bằng không được để trống !'],
    },
    thoiGianHoc: {
        type: Number,
        required: [true, 'Thời gian học tối thiểu không được để trống !'],
    },
    chuThich: {
        type: String
    },
    moTa: {
        type: String
    },
    status: {
        type: Boolean,
        default : true
    }
})

const LoaiBang = mongoose.model('LoaiBang', loaiBangLaiSchema);
module.exports = LoaiBang;