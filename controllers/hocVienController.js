const HocVien = require('./../models/hocvienModel');
const catchAsync = require('./../utils/catchAsync');

exports.getStudentInfo = catchAsync(async (req, res, next) => {
    try {
        const data = await HocVien.find({ id: req.params.id });
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

