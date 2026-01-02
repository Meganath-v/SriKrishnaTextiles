const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const orderRoute = require('./routes/orders');
const authRoute = require('./routes/auth');
const inventoryRoute = require('./routes/inventory');

app.use('/api/orders', orderRoute);
app.use('/api/auth', authRoute);
app.use('/api/inventory', inventoryRoute);
app.use('/api/recruitment', require('./routes/recruitment'));

// Database Connection
// Database Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sri_krishna_textiles');
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('MongoDB connection failed:', err.message);
        // Process should not exit so that the server can still serve static content or other routes
        // process.exit(1); 
    }
};

connectDB();

// Basic Route
app.get('/', (req, res) => {
    res.send('Sri Krishna Textiles API Running');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
