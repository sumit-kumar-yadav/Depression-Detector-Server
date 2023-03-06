const express = require('express');
const router = express.Router();


// Routes
const clientProfileRoute = require('./routes/client_profile_route');


router.use('/client', clientProfileRoute);


module.exports = router;
