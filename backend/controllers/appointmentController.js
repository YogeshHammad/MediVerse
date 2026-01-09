const Appointment = require('../models/Appointment');

// Book Appointment
exports.bookAppointment = async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    res.status(201).json({ message: 'Appointment booked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error booking appointment', error });
  }
};

// Get Appointments (Admin sees all, Patient sees theirs)
exports.getAppointments = async (req, res) => {
  try {
    const { userId, role } = req.query; // We send this from frontend
    
    let appointments;
    if (role === 'admin') {
      appointments = await Appointment.find().populate('patientId', 'name');
    } else {
      appointments = await Appointment.find({ patientId: userId });
    }
    
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error });
  }
};