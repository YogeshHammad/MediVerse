const express = require('express');
const router = express.Router();
const { getHospitalData, updateBed } = require('../controllers/hospitalController');

router.get('/', getHospitalData); // URL: /api/hospital
router.put('/update-bed', updateBed); // URL: /api/hospital/update-bed

module.exports = router;