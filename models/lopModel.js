const mongoose = require('mongoose');

const lopHocSchema = new mongoose.Schema({
    tenLop: {
        type: String,
        required: [true, 'Tên lớp không được để trống !'],
    },
    khaiGiang : {
        type : Date,
        required: [true, 'Ngày khai giảng không được để trống !'],
    },
    idGiangVien: {
        type: mongoose.Schema.ObjectId,
        ref: 'GiangVien',
        default: null,

    },
    idLoaiBang: {
        type: mongoose.Schema.ObjectId,
        required: [true, 'Loại bằng không được để trống !'],
        ref: 'LoaiBang'
    },
});
lopHocSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'idLoaiBang',
    }).populate({
        path: 'idGiangVien',
    });

    next();
});
const LopHoc = mongoose.model('LopHoc', lopHocSchema)
module.exports = LopHoc;