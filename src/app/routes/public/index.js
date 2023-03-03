const express = require('express');
const router = express.Router();


// Routes
const dataRoute = require('./routes/temp')



router.use('/get', dataRoute);


module.exports = router;
