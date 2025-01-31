const express = require('express');
const sensorController = require('../controllers/sensorController');
const router = express.Router();

// Submit sensor data
router.post('/data', sensorController.submitSensorData);

// Fetch sensor data for a specific patient
router.get('/data/:patientId', sensorController.getSensorData);

module.exports = router;