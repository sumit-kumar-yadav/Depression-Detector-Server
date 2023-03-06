const express = require('express');
const router = express.Router();


// Routes
const profileRoute = require('./profile');



router.use('/profile', profileRoute);

module.exports = router;
