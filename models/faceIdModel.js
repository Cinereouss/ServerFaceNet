const mongoose = require('mongoose');

const FaceIdSchema = new mongoose.Schema(
  {
    idLearner: {
      type: String,
      required: [true, 'Id learner can not be empty !']
    },
    name: {
      type: String,
      required: [true, 'Name can not be empty !']
    },
    embedding: {
      type: String,
      required: [true, 'Embedding can not be empty !']
    },
    createdAt: {
      type: Date,
      default: Date.now()
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const FaceId = mongoose.model('FaceID', FaceIdSchema);

module.exports = FaceId;
