const express = require('express');
const giangVienController = require('../controllers/giangVienController');
const classRoutes = require('./classRoutes');

const router = express.Router();

router.use('/:idTeacher/class', classRoutes);

router
    .route('/')
    .get(giangVienController.getAllTeachers);

router
    .route('/register-face')
    .patch(giangVienController.updateTeacherEmbedding);

module.exports = router;