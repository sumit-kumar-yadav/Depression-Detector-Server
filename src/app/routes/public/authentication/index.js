const express = require('express');
const router = express.Router();


// Routes
const emailAuthRoute = require('./routes/email_auth_route');


router.use('/email', emailAuthRoute);


module.exports = router;
