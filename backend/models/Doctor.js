const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true }, // e.g., Cardiology, Neurology
  status: { type: String, default: 'Available' }, // Available, In Surgery, Off Duty
  mobile: { type: String }
});

module.exports = mongoose.model('Doctor', doctorSchema);