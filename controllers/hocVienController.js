const HocVien = require('./../models/hocvienModel');
const catchAsync = require('./../utils/catchAsync');

exports.getStudentInfoByIdentity = catchAsync(async (req, res, next) => {
    const data = await HocVien.findOne({ cmnd: req.body.identity })
    if (data) {
        res.status(200).json({
            status: 'success',
            data
        });
    } else {
        res.status(404).json({
            status: 'fail',
            message: 'Cant find student with provided identity !',
        });
    }
});

exports.updateStudentEmbedding = catchAsync(async (req, res, next) => {
    const { id, embeddings } = req.body;

    const data = await HocVien.findByIdAndUpdate(id, { embedding: embeddings }, { new: true });

    if (data) {
        res.status(200).json({
            status: 'success',
            data: data.embedding,
        })
    } else {
        res.status(404).json({
            status: 'fail',
            message: 'Can not find student with this id provided !'
        })
    }
});

exports.getAllStudents = catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.idClass) filter = { idLop: req.params.idClass };

    let fields = '';
    let { getEmbedding } = req.query;
    if (getEmbedding === "true") {
        fields = 'ten embedding _id';
    }

    const data = await HocVien.find(filter).select(fields);

    res.status(200).json({
        status: 'success',
        result: data.length,
        data,
    });
});
