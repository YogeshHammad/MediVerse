const HospitalData = require('../models/HospitalData');

// Get Data (Beds & Blood)
exports.getHospitalData = async (req, res) => {
  try {
    let data = await HospitalData.findOne();
    
    // If no data exists (first time running), create it automatically
    if (!data) {
      const initialBeds = Array.from({ length: 20 }, (_, i) => ({
        number: i + 1,
        isOccupied: false
      }));
      data = new HospitalData({ beds: initialBeds });
      await data.save();
    }
    
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Update Bed Status (Admin clicks a bed)
exports.updateBed = async (req, res) => {
  try {
    const { bedId, isOccupied } = req.body;
    const data = await HospitalData.findOne();
    
    const bed = data.beds.id(bedId); // Find specific bed
    if (bed) {
      bed.isOccupied = isOccupied;
      await data.save();
      res.json({ message: 'Bed status updated', data });
    } else {
      res.status(404).json({ message: 'Bed not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating bed', error });
  }
};