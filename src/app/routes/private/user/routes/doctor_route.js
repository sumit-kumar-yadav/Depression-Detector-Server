const express = require('express');
const router = express.Router();


// Controllers
const doctorController = require('../controllers/doctor_controller');


router.route('/nearby')
    .get(doctorController.getNearByDoctors);

router.route('/get/all')
    .get(doctorController.getAllDoctors);


module.exports = router;
