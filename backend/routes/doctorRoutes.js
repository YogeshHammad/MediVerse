const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

// 1. Get All Doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. Add New Doctor
router.post('/add', async (req, res) => {
  const { name, specialty, mobile, status } = req.body;
  try {
    const newDoctor = new Doctor({ name, specialty, mobile, status });
    await newDoctor.save();
    res.status(201).json(newDoctor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 3. Update Doctor Status (The Toggle Feature)
router.put('/:id/status', async (req, res) => {
  const { status } = req.body;
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id, 
      { status: status }, 
      { new: true } // Return the updated document
    );
    res.json(doctor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 4. Delete Doctor
router.delete('/:id', async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.json({ message: 'Doctor Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;