const mongoose = require('mongoose');

const sensorDataSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    bloodPressure: { type: String },
    heartRate: { type: Number },
    glucoseLevel: { type: Number },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('SensorData', sensorDataSchema);