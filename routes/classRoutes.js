const express = require('express');
const classController = require('../controllers/classController');
const hocVienRoutes = require('./../routes/hocVienRoutes');

const router = express.Router({ mergeParams: true });

router.use('/:idClass/student', hocVienRoutes);

router.get('/', classController.getAllClass);

router.post('/createClass', classController.create)

module.exports = router;