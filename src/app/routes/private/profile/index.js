const express = require('express');
const router = express.Router();


// Routes
const userProfileRoute = require('./routes/user_profile_route');
const clientProfileRoute = require('./routes/client_profile_route');
const doctorProfileRoute = require('./routes/doctor_profile_route');


router.use('/user', allowedRolesMiddleware(["client", "doctor"]), userProfileRoute);

router.use('/client', clientProfileRoute);

router.use('/doctor', doctorProfileRoute);

module.exports = router;
