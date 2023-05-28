const express = require('express');
const router = express.Router();

const { throwValidationError, throwMulterUploadError } = require('../../../../engine/exceptions/validation_exception');
const { validate } = require('../validations/report_request');
const { imageUpload } = require('../../../../helpers/upload_helper');

// Controllers
const reportController = require('../controllers/report_controller');


router.route('/create/:appointmentId')
    .post(imageUpload('file'), throwMulterUploadError, validate('postReport'), throwValidationError, reportController.postReport);


module.exports = router;
