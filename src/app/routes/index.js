const express = require('express');
const router = express.Router();


// Routes
const publicRoute = require('./public');
// const privateRoute = require('./private');


router.use('/public', publicRoute);


module.exports = router;
