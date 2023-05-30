const express = require('express');
const router = express.Router();

const { throwValidationError } = require('../../../../engine/exceptions/validation_exception');
const { validate } = require('../validations/appointment_request');
const { allowedRolesMiddleware } = require('../../../../engine/middlewares/role_permission_middleware');


// Controllers
const appointmentController = require('../controllers/appointment_controller');


router.route('/request/:doctorId')
    .get(
        allowedRolesMiddleware(["client"]),
        validate('getRequestAppointment'), 
        throwValidationError, 
        appointmentController.getRequestAppointment
    );

router.route('/update/pending/appointment/:clientId')
    .put(
        allowedRolesMiddleware(["doctor"]),
        validate('putPendingAppointment'), 
        throwValidationError, 
        appointmentController.putPendingAppointment
    );

router.route('/update/accepted/appointment/:clientId')
    .put(
        allowedRolesMiddleware(["doctor"]),
        validate('putAcceptedAppointment'), 
        throwValidationError, 
        appointmentController.putAcceptedAppointment
    );

router.route('/fetch/doctor/appointments')
    .post(
        allowedRolesMiddleware(["doctor"]),
        validate('postGetAppointments'), 
        throwValidationError,
        appointmentController.postGetAppointments
    );

router.route('/cancel/appointments/:doctorId')
    .put(
        allowedRolesMiddleware(["client"]),
        validate('putCancelAppointment'), 
        throwValidationError, 
        appointmentController.putCancelAppointment
    );

module.exports = router;
