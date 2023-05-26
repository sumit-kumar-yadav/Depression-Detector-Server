const express = require('express');
const router = express.Router();


// Controllers
const clientController = require('../controllers/client_controller');


router.route('/get/all')
    .get(clientController.getAllClients);


module.exports = router;
