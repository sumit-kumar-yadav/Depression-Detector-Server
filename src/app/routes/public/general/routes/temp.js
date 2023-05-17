const express = require('express');
const router = express.Router();


// Controllers
const DataController = require('../controllers/temp');

// Temp --> remove this
router.route('/prediction')
    .post(DataController.postGetPrediction);
router.route('/prediction/anxiety')
    .post(DataController.postGetAnxietyPrediction);
router.route('/prediction/stress')
    .post(DataController.postGetStressPrediction);


module.exports = router;
