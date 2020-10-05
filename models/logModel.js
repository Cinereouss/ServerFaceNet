const mongoose = require('mongoose');

const Log = new mongoose.Schema({
    idHocVien : {
        type: mongoose.Schema.ObjectId,
        ref: 'HocVien'
    },
    imageCheckIn: {
        type: String,
        required: [true, 'Image check-in can not be empty !'],
        default: 'missing'
    },
    imageCheckOut: {
        type: String,
        required: [true, 'Image check-out can not be empty !'],
        default: 'missing'
    },
    checkInAt: {
        type: Date,
        required: [true, 'Check-in time can not be empty !'],
        default: 'missing'
    },
    checkOutAt: {
        type: Date,
        required: [true, 'Check-out time can not be empty !'],
        default: 'missing'
    },
    totalTime: {
        type: Number,
        default: 0
    }
})

const Log = mongoose.model('Log', Log)
module.exports = Log;