const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    fabricType: {
        type: String,
        // Allowing flexible input just in case, but frontend will dropdown
        required: true
    },
    quantity: { type: String, required: true }, // String to allow "500 Rolls" or "1000 Meters"
    contactPerson: { type: String },
    email: { type: String },
    specialInstructions: { type: String },
    status: {
        type: String,
        enum: ['Received', 'Processing', 'Shipped'],
        default: 'Received'
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
