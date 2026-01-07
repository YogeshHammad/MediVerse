const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

// 1. Get All Patients
router.get('/', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. Add New Patient
router.post('/add', async (req, res) => {
  const { name, age, gender, mobile, disease, doctor, department } = req.body;
  try {
    const newPatient = new Patient({ name, age, gender, mobile, disease, doctor, department });
    await newPatient.save();
    res.status(201).json(newPatient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 3. Delete Patient
router.delete('/:id', async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.json({ message: 'Patient Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;