const express = require('express');
const router = express.Router();

const { throwValidationError } = require('../../../../engine/exceptions/validation_exception');
const { validate } = require('../validations/client_profile_request');

// Controllers
const clientProfileController = require('../controllers/client_profile_controller');


router.route('/details').post(validate('postClientDetails'), throwValidationError, clientProfileController.postClientDetails);

router.route('/details').put(validate('putClientDetails'), throwValidationError, clientProfileController.putClientDetails);



module.exports = router;
