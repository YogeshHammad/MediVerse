const mongoose = require('mongoose');

const testRequestSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  mobile: { type: String, required: true },
  testType: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  status: { type: String, default: 'Pending' },
  pdfPath: { type: String } 
});

module.exports = mongoose.model('TestRequest', testRequestSchema);