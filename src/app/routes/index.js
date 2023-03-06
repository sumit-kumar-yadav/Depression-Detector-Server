const express = require('express');
const { route } = require('./public');
const router = express.Router();
const { authenticateUser } = require('../engine/middlewares/authentication_middleware');


// Routes
const publicRoute = require('./public');
const privateRoute = require('./private');


router.use('/public', publicRoute);
router.use('/private', authenticateUser, privateRoute);


module.exports = router;
