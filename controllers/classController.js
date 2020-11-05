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

exports.create = catchAsync(async (req, res, next) => {
    try {
        const dataCreated = await Class.create(req.body);
        res.status(200).send('success');
      } catch (err) {
        console.log(err);
        res.status(400).send(err);
      }
}) 