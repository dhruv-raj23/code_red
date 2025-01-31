const express = require('express');
const patientController = require('../controllers/patientController');
const router = express.Router();

router.post('/patient', patientController.createPatient);
router.get('/patient/:id', patientController.getPatient);

module.exports = router;