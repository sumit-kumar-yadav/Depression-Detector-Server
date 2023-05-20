const express = require('express');
const router = express.Router();


// Controllers
const depressionController = require('../controllers/depression');


router.route('/prediction')
    .post(depressionController.postGetPrediction);



module.exports = router;
