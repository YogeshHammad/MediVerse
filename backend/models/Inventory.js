const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  itemName: { type: String, required: true }, // e.g. "A+ Blood", "ICU Bed"
  type: { type: String, required: true }, // "Blood" or "Bed"
  quantity: { type: Number, default: 0 },
  status: { type: String, default: 'Available' }
});

module.exports = mongoose.model('Inventory', inventorySchema);