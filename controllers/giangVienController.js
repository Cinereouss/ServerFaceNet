const GiangVien = require('./../models/giangvienModel');
const catchAsync = require('./../utils/catchAsync');

exports.getAllTeachers = catchAsync(async (req, res, next) => {
    let fields = '';
    let { getEmbedding } = req.query;
    if (getEmbedding === "true") {
        fields = 'ten embedding account';
    }

    const data = await GiangVien.find({}).select(fields);
    res.status(200).json({
        status: 'success',
        result: data.length,
        data
    })
});

exports.updateTeacherEmbedding = catchAsync(async (req, res, next) => {
    const { id, embeddings } = req.body;

    const data = await GiangVien.findByIdAndUpdate(id, { embedding: embeddings }, { new: true });

    if (data) {
        res.status(200).json({
            status: 'success',
            data: data.embedding,
        })
    } else {
        res.status(404).json({
            status: 'fail',
            message: 'Can not find teacher with this id provided !'
        })
    }
});