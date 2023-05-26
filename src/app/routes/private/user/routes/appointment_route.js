const express = require('express');
const router = express.Router();


// Controllers
const appointmentController = require('../controllers/appointment');


router.route('/request/:doctorId')
    .get(appointmentController.getRequestAppointment);


module.exports = router;
