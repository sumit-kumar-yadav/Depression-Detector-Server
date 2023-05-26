const express = require('express');
const router = express.Router();


// Routes
const doctorRoute = require('./routes/doctor_route');
const clientRoute = require('./routes/client_route');
const appointmentRoute = require('./routes/appointment_route');


router.use('/doctor', doctorRoute);
router.use('/client', clientRoute);
router.use('/appointment', appointmentRoute);


module.exports = router;
