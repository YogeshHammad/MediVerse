const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  mobile: { type: String, required: true }, // 👈 NEW FIELD
  doctorName: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  status: { type: String, default: 'Pending' }
});

module.exports = mongoose.model('Appointment', appointmentSchema);