const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['admin', 'doctor', 'patient'], 
    default: 'patient' 
  },
  specialization: { type: String }, // Only for Doctors
  isDoctorAvailable: { type: Boolean, default: true }, // For the "Live Status" feature
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }]
});

module.exports = mongoose.model('User', userSchema);