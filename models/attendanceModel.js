const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema(
  {
    idLearner: {
      type: String,
      required: [true, 'Id learner can not be empty !']
    },
    name: {
      type: String,
      required: [true, 'Name can not be empty !']
    },
    image: {
      type: String,
      required: [true, 'Image can not be empty !']
    },
    attemptAt: {
      type: String,
      required: [true, 'Attemp time can not be empty !']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const Attendance = mongoose.model('Attendance', AttendanceSchema);

module.exports = Attendance;
