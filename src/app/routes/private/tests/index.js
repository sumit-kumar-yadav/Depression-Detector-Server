const express = require('express');
const router = express.Router();


// Routes
const depressionRoute = require('./routes/depression');
const anxietyRoute = require('./routes/anxiety');
const stressRoute = require('./routes/stress');


router.use('/depression', depressionRoute);
router.use('/anxiety', anxietyRoute);
router.use('/stress', stressRoute);


module.exports = router;
