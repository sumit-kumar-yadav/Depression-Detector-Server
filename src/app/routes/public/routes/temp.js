const express = require('express');
const router = express.Router();


// Controllers
const DataController = require('../controllers/temp');


router.route('/prediction')
    .get(DataController.getPrediction);


module.exports = router;
