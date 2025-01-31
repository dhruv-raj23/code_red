const User = require('../models/User');
const Patient = require('../models/Patient');

// Update doctor's online/offline status
exports.updateDoctorStatus = async (req, res) => {
    try {
        const { doctorId, status } = req.body;

        // Validate input
        if (!doctorId || !status) {
            return res.status(400).json({ message: 'Doctor ID and status are required' });
        }

        // Update doctor's status
        const doctor = await User.findByIdAndUpdate(
            doctorId,
            { status },
            { new: true }
        );

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        res.status(200).json({ message: 'Doctor status updated', doctor });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Fetch a list of online doctors
exports.getOnlineDoctors = async (req, res) => {
    try {
        const onlineDoctors = await User.find({ role: 'doctor', status: 'online' });

        res.status(200).json({ onlineDoctors });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Assign a doctor to a patient
exports.assignDoctorToPatient = async (req, res) => {
    try {
        const { patientId, doctorId } = req.body;

        // Validate input
        if (!patientId || !doctorId) {
            return res.status(400).json({ message: 'Patient ID and Doctor ID are required' });
        }

        // Assign doctor to patient
        const patient = await Patient.findByIdAndUpdate(
            patientId,
            { doctorId },
            { new: true }
        );

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.status(200).json({ message: 'Doctor assigned to patient', patient });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};