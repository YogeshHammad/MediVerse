const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');

// 1. Get All Items
router.get('/', async (req, res) => {
  try {
    const items = await Inventory.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. Add New Item (e.g., "O- Blood")
router.post('/add', async (req, res) => {
  const { itemName, type, quantity } = req.body;
  try {
    const newItem = new Inventory({ itemName, type, quantity });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 3. Update Quantity (Increase/Decrease)
router.put('/:id', async (req, res) => {
  const { quantity } = req.body;
  try {
    const item = await Inventory.findByIdAndUpdate(
      req.params.id, 
      { quantity: quantity }, 
      { new: true }
    );
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 4. Delete Item
router.delete('/:id', async (req, res) => {
  try {
    await Inventory.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;