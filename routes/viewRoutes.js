const express = require('express');

const viewController = require('./../controllers/viewController');

const router = express.Router();

router.route('/').get(viewController.showHomePage);
router.route('/hocvien').get(viewController.showHocvienPage);
router.route('/lichhen').get(viewController.showLichhenPage);
router.route('/rp-tiledo').get(viewController.showRPTLDPage);
router.route('/user').get(viewController.showUserPage);
router.route('/diemdanh').get(viewController.showDiemdanhPage);

module.exports = router;
