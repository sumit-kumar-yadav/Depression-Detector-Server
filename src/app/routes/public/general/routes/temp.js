const express = require('express');
const router = express.Router();


// Controllers
const DataController = require('../controllers/temp');

// Temp --> remove this
router.route('/prediction')
    .post(DataController.postGetPrediction);


module.exports = router;
