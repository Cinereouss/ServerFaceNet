const mongoose = require('mongoose');

const GiangVien = new mongoose.Schema({
    idNguoi : {
        type: mongoose.Schema.ObjectId,
        ref: 'Nguoi'
    },
    isbienche : {
        type : Boolean,
        default : 0
    }
})

const GiangVien = mongoose.model('GiangVien', GiangVien)
module.exports = GiangVien;