const express = require('express');
const faceIdController = require('./../controllers/faceIdController');

const router = express.Router();

router
  .route('/')
  .post(faceIdController.registerNewFaceId)
  .get(faceIdController.getFaceIdData);

module.exports = router;
