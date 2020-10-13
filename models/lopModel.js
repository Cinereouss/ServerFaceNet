const mongoose = require('mongoose');

const LopHoc = new mongoose.Schema({
    ten : {
        type : String,
        required : [true, 'Tên lớp không được để trống !'],
    },
    khaigiang : {
        type : Date,
        default: Date.now()
    },
    idGiangVien: {
        type: mongoose.Schema.ObjectId,
        ref: 'GiangVien'
    },
    idLoaiBang: {
        type: mongoose.Schema.ObjectId,
        ref: 'LoaiBang'
    },
})

const LopHoc = mongoose.model('LopHoc', LopHoc)
module.exports = LopHoc;