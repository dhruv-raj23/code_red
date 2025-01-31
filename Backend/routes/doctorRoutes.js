const express = require('express');
const doctorController = require('../controllers/doctorController');
const router = express.Router();

// Update doctor's online/offline status
router.put('/status', doctorController.updateDoctorStatus);

// Fetch a list of online doctors
router.get('/online', doctorController.getOnlineDoctors);

// Assign a doctor to a patient
router.post('/assign', doctorController.assignDoctorToPatient);

module.exports = router;