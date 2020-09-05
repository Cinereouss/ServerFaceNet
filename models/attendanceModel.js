const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema(
  {
    idLearner: {
      type: mongoose.Schema.ObjectId,
      ref: 'FaceID'
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
      type: String,
      required: [true, 'Check-in time can not be empty !'],
      default: 'missing'
    },
    checkOutAt: {
      type: String,
      required: [true, 'Check-out time can not be empty !'],
      default: 'missing'
    },
    totalTime: {
      type: Number,
      default: 0
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
