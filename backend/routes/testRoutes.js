const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const TestRequest = require('../models/TestRequest');

// 📂 Multer Setup (File Save Logic)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files in 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  }
});
const upload = multer({ storage: storage });

// 1. Get All Requests
router.get('/', async (req, res) => {
  try {
    const tests = await TestRequest.find();
    res.json(tests);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// 2. Book Test
router.post('/book', async (req, res) => {
  const { patientName, mobile, testType, date, time } = req.body;
  try {
    const newTest = new TestRequest({ patientName, mobile, testType, date, time });
    await newTest.save();
    res.status(201).json(newTest);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

// 3. Update Status
router.put('/:id', async (req, res) => {
  try {
    const updatedTest = await TestRequest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTest);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

// 4. 📤 UPLOAD REPORT (New Route)
router.post('/:id/upload', upload.single('reportFile'), async (req, res) => {
  try {
    const fileUrl = req.file.filename; // Get filename
    const updatedTest = await TestRequest.findByIdAndUpdate(
      req.params.id, 
      { pdfPath: fileUrl, status: 'Report Ready' }, // Save path & Update status
      { new: true }
    );
    res.json(updatedTest);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

// 5. Search
router.get('/search/:mobile', async (req, res) => {
  try {
    const tests = await TestRequest.find({ mobile: req.params.mobile });
    res.json(tests);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;