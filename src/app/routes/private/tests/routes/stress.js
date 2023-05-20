const express = require('express');
const router = express.Router();


// Controllers
const stressController = require('../controllers/stress');


router.route('/prediction')
    .post(stressController.postGetStressPrediction);



module.exports = router;
