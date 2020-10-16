const express = require('express');
const hocVienController = require('./../controllers/hocVienController');

const router = express.Router({ mergeParams: true });

router
    .route('/')
    .get(hocVienController.getAllStudents);

router
    .route('/stats')
    .get(hocVienController.getStudentInfoByIdentity);

router
    .route('/register-face')
    .patch(hocVienController.updateStudentEmbedding);

module.exports = router;