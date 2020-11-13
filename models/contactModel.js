const mongoose = require('mongoose');


const contactSchema = new mongoose.Schema({
    diaChi: {
        type: String,
        required: [true, 'Địa chỉ không được để trống !'],
    },
    diemDon1: {
        type: String,
    },
    diemDon2: {
        type: String,
    },
    beginTime: {
        type: String,
        required: [true, 'Giờ mở cửa không được để trống !'],
    },
    endTime: {
        type: String,
        required: [true, 'Giờ đóng cửa không được để trống !'],
    },
    phone: {
        type: String,
        required: [true, 'Số điện thoại không được để trống !'],
    },
    email: {
        type: String,
    },
    logo: {
        type: String,
        required: [true, 'Logo không được để trống !'],
    }
})

const Contact = mongoose.model('Contact', contactSchema)
module.exports = Contact;