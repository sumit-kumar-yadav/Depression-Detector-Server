const express = require('express');
const router = express.Router();

const { throwValidationError, throwMulterUploadError } = require('../../../../engine/exceptions/validation_exception');
const { validate } = require('../validations/test_requests');


// Controllers
const anxietyController = require('../controllers/anxiety');


router.route('/prediction')
    .post(validate('postGetDepressionPrediction'), throwValidationError, anxietyController.postGetAnxietyPrediction);



module.exports = router;
