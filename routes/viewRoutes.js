const express = require('express');
const viewController = require('./../controllers/viewController');

const router = express.Router();

router.route('/').get(viewController.showHomePage);
router.route('/hocvien').get(viewController.showHocvienPage);

module.exports = router;
