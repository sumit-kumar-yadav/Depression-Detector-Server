const express = require('express');
const router = express.Router();

const { throwValidationError } = require('../../../../engine/exceptions/validation_exception');
const { validate } = require('../validations/user_profile_request');

// Controllers
const userProfileController = require('../controllers/user_profile_controller');


// Fetch the user profile
router.route('/profile').get(userProfileController.getUserProfile);

router.route('/change/password')
    .put(validate('putUserPassword'), throwValidationError, userProfileController.putUserPassword);

router.route('/logout').get(userProfileController.getLogout);

router.route('/logout/all').get(userProfileController.getLogoutAll);



module.exports = router;
