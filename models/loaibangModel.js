const mongoose = require('mongoose');

const LoaiBangLai = new mongoose.Schema({
    tenbang : {
        type : String,
        required : [true, 'Tên bằng không được để trống !'],
    },
    thoigianhoc : {
        type : Number,
        required : [true, 'Thời gian học tối thiểu không được để trống !'],
        default : 0
    },
    chuthic : {
        type : String
    }
})

const LoaiBang = mongoose.model('LoaiBang', LoaiBang);
module.exports = LoaiBang;