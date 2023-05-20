const express = require('express');
const router = express.Router();


// Routes
const profileRoute = require('./profile');
const testRoute = require('./tests');



router.use('/profile', profileRoute);
router.use('/test', testRoute);

module.exports = router;
