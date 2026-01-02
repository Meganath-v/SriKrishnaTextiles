const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
    productName: { type: String, required: true },
    stockLevel: { type: Number, default: 0 },
    lastUpdated: { type: Date, default: Date.now }
}, { strict: false }); // Allow flexible fields from Excel if needed

module.exports = mongoose.model('Inventory', InventorySchema);
