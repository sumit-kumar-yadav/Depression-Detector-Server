const express = require('express');
const router = express.Router();

const { throwValidationError, throwMulterUploadError } = require('../../../../engine/exceptions/validation_exception');
const { validate } = require('../validations/test_requests');


// Controllers
const depressionController = require('../controllers/depression');


router.route('/prediction')
    .post(validate('postGetAnxietyPrediction'), throwValidationError, depressionController.postGetDepressionPrediction);



module.exports = router;
