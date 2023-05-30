const express = require('express');
const router = express.Router();

const { throwValidationError, throwMulterUploadError } = require('../../../../engine/exceptions/validation_exception');
const { validate } = require('../validations/report_request');
const { imageUpload } = require('../../../../helpers/upload_helper');
const { allowedRolesMiddleware } = require('../../../../engine/middlewares/role_permission_middleware');

// Controllers
const reportController = require('../controllers/report_controller');


router.route('/create/:appointmentId')
    .post(
        allowedRolesMiddleware(["doctor"]),
        imageUpload('file'), 
        throwMulterUploadError, 
        validate('postReport'), 
        throwValidationError, 
        reportController.postReport
    );

router.route('/get/all-reports-of-doctor')
    .get(allowedRolesMiddleware(["doctor"]), reportController.getAllReportsOfADr);

router.route('/get/all-reports-of-client')
    .get(allowedRolesMiddleware(["client"]),reportController.getAllReportsOfClient);

router.route('/get/all-reports-of-client-doctor')
    .get(
        allowedRolesMiddleware(["doctor", "client"]), 
        validate('getAllReportsOfClientDoctor'), 
        throwValidationError, 
        reportController.getAllReportsOfClientDoctor
    );

module.exports = router;
