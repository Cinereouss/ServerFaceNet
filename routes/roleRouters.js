const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/active-role', authController.activeRole);
router.post('/active-action', authController.activeAction);
router.post('/add-action', authController.addAction);
router.post('/add-group', authController.addGroup);

module.exports = router;