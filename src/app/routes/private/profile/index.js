const express = require('express');
const router = express.Router();


// Routes
const clientProfileRoute = require('./routes/client_profile_route');
const userProfileRoute = require('./routes/user_profile_route');


router.use('/client', clientProfileRoute);

router.use('/user', userProfileRoute);

module.exports = router;
