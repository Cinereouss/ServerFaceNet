const Class = require('./../models/lopModel');
const catchAsync = require('./../utils/catchAsync');

exports.getAllClass = catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.idTeacher) filter = { idGiangVien: req.params.idTeacher };

    const data = await Class.find(filter);

    res.status(200).json({
        status: 'success',
        result: data.length,
        data,
    });
});