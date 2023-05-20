const express = require('express');
const router = express.Router();


// Routes
const authRoute = require('./authentication');


router.use('/auth', authRoute);

module.exports = router;
