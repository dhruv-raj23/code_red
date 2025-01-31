const SensorData = require('../models/SensorData');

// Submit sensor data
exports.submitSensorData = async (req, res) => {
    try {
        const { patientId, bloodPressure, heartRate, glucoseLevel } = req.body;

        // Validate input
        if (!patientId || !bloodPressure || !heartRate || !glucoseLevel) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Save sensor data
        const sensorData = new SensorData({
            patientId,
            bloodPressure,
            heartRate,
            glucoseLevel,
        });

        await sensorData.save();

        res.status(201).json({ message: 'Sensor data submitted', sensorData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Fetch sensor data for a specific patient
exports.getSensorData = async (req, res) => {
    try {
        const { patientId } = req.params;

        // Fetch sensor data for the patient
        const sensorData = await SensorData.find({ patientId }).sort({ timestamp: -1 });

        if (!sensorData.length) {
            return res.status(404).json({ message: 'No sensor data found for this patient' });
        }

        res.status(200).json({ sensorData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};