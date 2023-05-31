const express = require('express');
const router = express.Router();

const { throwValidationError, throwMulterUploadError } = require('../../../../engine/exceptions/validation_exception');
const { validate } = require('../validations/doctor_profile_request');
const { imageUpload } = require('../../../../helpers/upload_helper');
const { allowedRolesMiddleware } = require('../../../../engine/middlewares/role_permission_middleware');

// Controllers
const doctorProfileController = require('../controllers/doctor_profile_controller');


router.route('/details')
    .post(imageUpload('avatar'), throwMulterUploadError, validate('postDoctorDetails'), throwValidationError, doctorProfileController.postDoctorDetails);

router.route('/details')
    .put(
        allowedRolesMiddleware(["doctor"]),
        imageUpload('avatar'), 
        throwMulterUploadError, 
        validate('putDoctorDetails'), 
        throwValidationError, 
        doctorProfileController.putDoctorDetails
    );




module.exports = router;
