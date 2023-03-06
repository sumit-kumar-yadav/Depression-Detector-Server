const express = require('express');
const router = express.Router();

const { throwValidationError } = require('../../../../engine/exceptions/validation_exception');
const { validate } = require('../validations/client_profile_request');

// Controllers
const clientProfileController = require('../controllers/client_profile_controller');

// Sing up by email 
router.route('/details').post(validate('postClientDetails'), throwValidationError, clientProfileController.postClientDetails);

// Sign in by email 
router.route('/details').put(validate('putClientDetails'), throwValidationError, clientProfileController.putClientDetails);



module.exports = router;
