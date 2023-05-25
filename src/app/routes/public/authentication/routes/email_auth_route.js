const express = require('express');
const router = express.Router();

const { throwValidationError } = require('../../../../engine/exceptions/validation_exception');
const { validate } = require('../validations/authentication_request');

// Controllers
const EmailAuthController = require('../controllers/email_auth_controller');

// Sing up by email 
router.route('/signup').post(validate('postSignupEmail'), throwValidationError, EmailAuthController.postSignup);

// Sign in by email 
router.route('/signin').post(validate('postSigninEmail'), throwValidationError, EmailAuthController.postSignin);

// Email verificatoin (OTP generation)
router.route('/create/otp').post(EmailAuthController.postCreateOtp);



module.exports = router;
