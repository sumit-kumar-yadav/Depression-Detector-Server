const express = require('express');
const router = express.Router();

const { throwValidationError, throwMulterUploadError } = require('../../../../engine/exceptions/validation_exception');
const { validate } = require('../validations/report_request');
const { imageUpload } = require('../../../../helpers/upload_helper');

// Controllers
const reportController = require('../controllers/report_controller');


router.route('/create/:appointmentId')
    .post(imageUpload('file'), throwMulterUploadError, validate('postReport'), throwValidationError, reportController.postReport);

router.route('/get/all-reports-of-doctor')
    .get(reportController.getAllReportsOfADr);

router.route('/get/all-reports-of-client')
    .get(reportController.getAllReportsOfClient);

router.route('/get/all-reports-of-client-doctor')
    .get(validate('getAllReportsOfClientDoctor'), throwValidationError, reportController.getAllReportsOfClientDoctor);

module.exports = router;
