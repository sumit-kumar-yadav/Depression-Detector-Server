const express = require('express');
const router = express.Router();


// Routes
const profileRoute = require('./profile');
const testRoute = require('./tests');
const userRoute = require('./user');


router.use('/profile', profileRoute);
router.use('/test', testRoute);
router.use('/user', userRoute);

module.exports = router;
