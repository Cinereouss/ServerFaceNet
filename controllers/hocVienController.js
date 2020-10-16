const HocVien = require('./../models/hocvienModel');
const catchAsync = require('./../utils/catchAsync');

exports.getStudentInfo = catchAsync(async (req, res, next) => {
    try {
        const data = await HocVien.find({ id: req.params.id });
        res.status(200).json({
            status: 'success',
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
});

exports.updateStudentEmbedding = catchAsync(async (req, res, next) => {
    try {
        const data = await HocVien.findByIdAndUpdate({ id: req.params.id }, { embedding: req.body.embedding });
        res.status(200).json({
            status: 'success',
            data
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: 'Can not find HocVien with this id'
        })
    }
});

exports.dangKyOnline = catchAsync(async (req, res, next) => {
    console.log(req.body)
    try {
        const dataCreated = await HocVien.create(req.body);
        res.status(200).send('success');
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});
