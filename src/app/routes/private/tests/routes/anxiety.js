const express = require('express');
const router = express.Router();


// Controllers
const anxietyController = require('../controllers/anxiety');


router.route('/prediction')
    .post(anxietyController.postGetAnxietyPrediction);



module.exports = router;
