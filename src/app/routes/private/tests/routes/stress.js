const express = require('express');
const router = express.Router();

const { throwValidationError, throwMulterUploadError } = require('../../../../engine/exceptions/validation_exception');
const { validate } = require('../validations/test_requests');


// Controllers
const stressController = require('../controllers/stress');


router.route('/prediction')
    .post(validate('postGetStressPrediction'), throwValidationError, stressController.postGetStressPrediction);



module.exports = router;
