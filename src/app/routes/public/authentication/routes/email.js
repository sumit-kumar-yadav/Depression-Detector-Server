const express = require('express');
const router = express.Router();

const { throwValidationError } = require('../../../../engine/exceptions/validation_exception');
const { validate } = require('../validations/authentication_request');

// Controllers
const EmailAuthController = require('../controllers/email_auth_controller');


router.route('/signup').post(validate('postSignupEmail'), throwValidationError, EmailAuthController.postSignup);


module.exports = router;
