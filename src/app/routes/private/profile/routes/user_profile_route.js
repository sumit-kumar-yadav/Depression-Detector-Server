const express = require('express');
const router = express.Router();

// const { throwValidationError } = require('../../../../engine/exceptions/validation_exception');
// const { validate } = require('../validations/client_profile_request');

// Controllers
const userProfileController = require('../controllers/user_profile_controller');

// Logout from a device 
router.route('/logout').get(userProfileController.getLogout);

// Logout from all the devices
router.route('/logout/all').get(userProfileController.getLogoutAll);



module.exports = router;
