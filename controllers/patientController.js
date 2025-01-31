// controllers/patientController.js
const Patient = require('../models/Patient');

// Create a new patient
exports.createPatient = async (req, res) => {
    try {
        const { name, age, symptoms, agentId } = req.body;

        // Create new patient
        const patient = new Patient({ name, age, symptoms, agentId });
        await patient.save();

        res.status(201).json({ patient });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Fetch patient details
exports.getPatient = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id).populate('agentId doctorId');
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.status(200).json({ patient });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};