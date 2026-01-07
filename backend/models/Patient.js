const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  mobile: { type: String, required: true },
  disease: { type: String, required: true },
  doctor: { type: String, required: true },
  department: { type: String, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, default: 'Admitted' } // Admitted, Discharged, OPD
});

module.exports = mongoose.model('Patient', patientSchema);