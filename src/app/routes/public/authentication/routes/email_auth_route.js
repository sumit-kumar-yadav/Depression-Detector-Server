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
router.route('/create/otp')
    .post(validate('otp'), throwValidationError, EmailAuthController.postCreateAuthOtp);

// Forgot Password 
router.route('/create/forgot-password/otp')
    .post(validate('otp'), throwValidationError, EmailAuthController.postCreateForgotPasswordOtp);

// Verify Forgot Password OTP
router.route('/verify/forgot-password/otp')
    .post(validate('otp'), throwValidationError, EmailAuthController.postVerifyForgotPasswordOtp);

// Reset passing after otp verification 
router.route('/reset/password')
    .post(validate('putResetPassword'), throwValidationError, EmailAuthController.putResetPassword);


module.exports = router;
