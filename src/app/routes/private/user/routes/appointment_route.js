const express = require('express');
const router = express.Router();

const { throwValidationError } = require('../../../../engine/exceptions/validation_exception');
const { validate } = require('../validations/appointment_request');


// Controllers
const appointmentController = require('../controllers/appointment');


router.route('/request/:doctorId')
    .get(validate('getRequestAppointment'), throwValidationError, appointmentController.getRequestAppointment);

router.route('/update/pending/appointment/:clientId')
    .put(validate('putPendingAppointment'), throwValidationError, appointmentController.putPendingAppointment);

router.route('/update/accepted/appointment/:clientId')
    .put(validate('putAcceptedAppointment'), throwValidationError, appointmentController.putAcceptedAppointment);

router.route('/fetch/doctor/appointments')
    .post(validate('postGetAppointments'), throwValidationError, appointmentController.postGetAppointments);

router.route('/cancel/appointments/:doctorId')
    .put(validate('putCancelAppointment'), throwValidationError, appointmentController.putCancelAppointment);

module.exports = router;
