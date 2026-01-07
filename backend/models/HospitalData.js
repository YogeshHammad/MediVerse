const mongoose = require('mongoose');

const hospitalDataSchema = new mongoose.Schema({
  // Visual Bed Map (Array of 20 beds)
  beds: [
    {
      number: Number,
      isOccupied: { type: Boolean, default: false },
      patientName: String
    }
  ],
  // Visual Blood Bank
  bloodBank: {
    A_Pos: { type: Number, default: 10 },
    B_Pos: { type: Number, default: 8 },
    O_Pos: { type: Number, default: 15 },
    AB_Neg: { type: Number, default: 2 }
  }
});

module.exports = mongoose.model('HospitalData', hospitalDataSchema);