const mongoose = require('mongoose');
const timeExtractor = require('./../utils/timeExtractor');

const logSchema = new mongoose.Schema({
    idHocVien : {
        type: mongoose.Schema.ObjectId,
        ref: 'HocVien'
    },
    imageCheckIn: {
        type: String,
        default: null,
    },
    imageCheckOut: {
        type: String,
        default: null,
    },
    checkInAt: {
        type: Date,
        default: null,
    },
    checkOutAt: {
        type: Date,
        default: null,
    },
    totalTime: {
        type: Number,
        default: 0
    }
})

logSchema.methods.calculateTotalTime = function(checkOutAt) {
    // Invalid time: 7 - 11 && 13 - 18
    const hourCI = timeExtractor.localTimeExtractor(this.checkInAt).hour;
    const minuteCI = timeExtractor.localTimeExtractor(this.checkInAt).minute;
    const secondCI = timeExtractor.localTimeExtractor(this.checkInAt).second;
    const dayCI = timeExtractor.localTimeExtractor(this.checkInAt).day;
    const monthCI = timeExtractor.localTimeExtractor(this.checkInAt).month;
    const yearCI = timeExtractor.localTimeExtractor(this.checkInAt).year;

    const hourCO = timeExtractor.javaTimeExtractor(checkOutAt).hour;
    const minuteCO = timeExtractor.javaTimeExtractor(checkOutAt).minute;
    const secondCO = timeExtractor.javaTimeExtractor(checkOutAt).second;
    const dayCO = timeExtractor.javaTimeExtractor(checkOutAt).day;
    const monthCO = timeExtractor.javaTimeExtractor(checkOutAt).month;
    const yearCO = timeExtractor.javaTimeExtractor(checkOutAt).year;

    // Check differences in day, month, year
    if (`${dayCI}${monthCI}${yearCI}` !== `${dayCO}${monthCO}${yearCO}`) {
        return 0;
    }

    // Check-in in morning, check-out in afternoon
    if (hourCI >= 7 && hourCI <= 10 && hourCO >= 13 && hourCO <= 17) {
        return 0;
    }

    return (
        hourCO * 60 * 60 +
        minuteCO * 60 +
        secondCO -
        (hourCI * 60 * 60 + minuteCI * 60 + secondCI)
    );
};

const Log = mongoose.model('Log', logSchema)
module.exports = Log;