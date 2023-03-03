const express = require('express');
const router = express.Router();


// Routes
const dataRoute = require('./general/routes/temp');
const authRoute = require('./authentication');

// temp route -- remove this
router.use('/get', dataRoute);

router.use('/auth', authRoute);

module.exports = router;
