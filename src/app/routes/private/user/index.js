const express = require('express');
const router = express.Router();


// Routes
const doctorRoute = require('./routes/doctor_route');


router.use('/doctor', doctorRoute);


module.exports = router;
