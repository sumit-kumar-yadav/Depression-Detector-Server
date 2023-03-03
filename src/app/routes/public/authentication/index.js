const express = require('express');
const router = express.Router();


// Routes
const emailAuthRoute = require('./routes/email');


router.use('/email', emailAuthRoute);


module.exports = router;
