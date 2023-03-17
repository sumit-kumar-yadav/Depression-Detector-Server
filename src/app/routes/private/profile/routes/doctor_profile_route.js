const express = require('express');
const router = express.Router();

const { throwValidationError, throwMulterUploadError } = require('../../../../engine/exceptions/validation_exception');
const { validate } = require('../validations/doctor_profile_request');
const { imageUpload } = require('../../../../helpers/upload_helper');

// Controllers
const doctorProfileController = require('../controllers/doctor_profile_controller');


router.route('/details')
    .post(imageUpload, throwMulterUploadError, validate('postDoctorDetails'), throwValidationError, doctorProfileController.postDoctorDetails);

router.route('/details')
    .put(imageUpload, throwMulterUploadError, validate('putDoctorDetails'), throwValidationError, doctorProfileController.putDoctorDetails);



module.exports = router;
