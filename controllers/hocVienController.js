const HocVien = require('./../models/hocvienModel');
const catchAsync = require('./../utils/catchAsync');

exports.getStudentInfo = catchAsync(async (req, res, next) => {
  try {
    const data = await HocVien.find({ id: req.params.id });
    res.status(200).json({
      status: 'success'
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
});

exports.updateStudentEmbedding = catchAsync(async (req, res, next) => {
  try {
    const data = await HocVien.findByIdAndUpdate(
      { id: req.params.id },
      { embedding: req.body.embedding }
    );
    res.status(200).json({
      status: 'success',
      data
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Can not find HocVien with this id'
    });
  }
});

exports.dangKyOnline = catchAsync(async (req, res, next) => {
  try {
    const dataCreated = await HocVien.create(req.body);
    res.status(200).send('success');
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

exports.setAppointment = catchAsync(async (req, res, next) => {
  try {
    let result = await HocVien.findOneAndUpdate(
      { _id: req.body._id },
      {
        ngayHen: req.body.ngayHen,
        ghiChu: req.body.ghiChu,
        pending: false
      },
      {
        rawResult: true // Return the raw result from the MongoDB driver
      }
    );
    if (result.lastErrorObject.updatedExisting) {
      res.status(200).send('success');
    } else {
      res.status(400).send('update fail!');
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});
