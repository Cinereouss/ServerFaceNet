const express = require('express');
const hocVienController = require('./../controllers/hocVienController');

const router = express.Router();

router
    .route('/:id')
    .get(hocVienController.getStudentInfo)
    .patch(hocVienController.updateStudentEmbedding)

module.exports = router;