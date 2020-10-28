const GiangVien = require('./../models/giangvienModel');
const catchAsync = require('./../utils/catchAsync');

exports.getAllTeachers = catchAsync(async (req, res, next) => {
    let fields = '';
    let filter = {};
    let { getEmbedding } = req.query;
    if (getEmbedding === "true") {
        fields = 'ten embedding account';
        filter = { embedding: { $ne: null } };
    }

    const data = await GiangVien.find(filter).select(fields);
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