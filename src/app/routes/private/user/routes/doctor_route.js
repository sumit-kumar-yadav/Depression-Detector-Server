const express = require('express');
const router = express.Router();


// Controllers
const doctorController = require('../controllers/doctor_controller');


router.route('/nearby')
    .get(doctorController.getNearByDoctors);


module.exports = router;
