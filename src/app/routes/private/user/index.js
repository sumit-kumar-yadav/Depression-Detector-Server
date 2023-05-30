const express = require('express');
const router = express.Router();

const { allowedRolesMiddleware } = require('../../../engine/middlewares/role_permission_middleware');

// Routes
const doctorRoute = require('./routes/doctor_route');
const clientRoute = require('./routes/client_route');
const appointmentRoute = require('./routes/appointment_route');
const reportRoute = require('./routes/report_route');


router.use('/doctor', allowedRolesMiddleware(["client"]), doctorRoute);
router.use('/client', allowedRolesMiddleware(["client"]),  clientRoute);
router.use('/appointment', appointmentRoute);
router.use('/report', reportRoute);


module.exports = router;
