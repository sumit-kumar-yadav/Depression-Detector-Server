const express = require('express');
const router = express.Router();

const { throwValidationError, throwMulterUploadError } = require('../../../../engine/exceptions/validation_exception');
const { validate } = require('../validations/client_profile_request');
const { imageUpload } = require('../../../../helpers/upload_helper');
const { allowedRolesMiddleware } = require('../../../../engine/middlewares/role_permission_middleware');

// Controllers
const clientProfileController = require('../controllers/client_profile_controller');


router.route('/details')
    .post(imageUpload('avatar'), throwMulterUploadError, validate('postClientDetails'), throwValidationError, clientProfileController.postClientDetails);

router.route('/details')
    .put(
        allowedRolesMiddleware(["client"]),
        imageUpload('avatar'), 
        throwMulterUploadError, 
        validate('putClientDetails'), 
        throwValidationError, 
        clientProfileController.putClientDetails
    );

router.route('/health')
    .put(
        allowedRolesMiddleware(["client"]),
        validate('putClientHealth'), 
        throwValidationError, 
        clientProfileController.putClientHealth
    );


module.exports = router;
