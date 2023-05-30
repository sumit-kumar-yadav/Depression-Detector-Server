const express = require('express');
const router = express.Router();

const { allowedRolesMiddleware } = require('../../../engine/middlewares/role_permission_middleware');


// Routes
const depressionRoute = require('./routes/depression');
const anxietyRoute = require('./routes/anxiety');
const stressRoute = require('./routes/stress');


router.use('/depression', allowedRolesMiddleware(["client"]), depressionRoute);
router.use('/anxiety', allowedRolesMiddleware(["client"]), anxietyRoute);
router.use('/stress', allowedRolesMiddleware(["client"]), stressRoute);


module.exports = router;
