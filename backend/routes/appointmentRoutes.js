const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Get All Appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ date: 1 }); // Sort by date
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/// Book New Appointment (Updated)
router.post('/book', async (req, res) => {
  const { patientName, mobile, doctorName, date, time } = req.body; // 👈 Add mobile here
  try {
    const newAppointment = new Appointment({ patientName, mobile, doctorName, date, time }); // 👈 And here
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete Appointment
router.delete('/:id', async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Appointment Cancelled' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// 4. Update Appointment (Confirm or Reschedule)
router.put('/:id', async (req, res) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body, // This contains new status, date, or time
      { new: true }
    );
    res.json(updatedAppointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// 5. Check Status via Mobile
router.get('/status/:mobile', async (req, res) => {
  try {
    const appointments = await Appointment.find({ mobile: req.params.mobile });
    if (appointments.length === 0) {
      return res.status(404).json({ message: 'No appointment found for this number' });
    }
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;