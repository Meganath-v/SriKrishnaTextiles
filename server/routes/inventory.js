const express = require('express');
const router = express.Router();
const multer = require('multer');
const xlsx = require('xlsx');
const Inventory = require('../models/Inventory');

// Memory storage for file upload (we don't need to save file to disk, just parse it)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST: Upload Excel
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // Parse Buffer
        const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0]; // Assume first sheet
        const sheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(sheet);

        // Update Database
        // Strategy: wipe old inventory and replace, or upsert?
        // Prompt says "Update the MongoDB database with the new values". 
        // I'll do a simple wipe and insert for "Inventory Monitor" to keep it synced with Excel.

        await Inventory.deleteMany({}); // Optional: clear old data

        // Map data to schema if necessary, or just insert
        // Assuming Excel has headers: ProductName, StockLevel
        // If not, we might store raw. I'll assume headers match loosely or save raw.

        // Helper to find key in object case-insensitively
        const findValue = (row, keys) => {
            const rowKeys = Object.keys(row);
            for (const k of keys) {
                const foundKey = rowKeys.find(rk => rk.toLowerCase().trim() === k.toLowerCase());
                if (foundKey) return row[foundKey];
            }
            return null;
        };

        const formattedData = data.map(item => {
            const name = findValue(item, ['Product Name', 'ProductName', 'Product', 'Item', 'Name', 'Fabric']);
            const stock = findValue(item, ['Stock Level', 'StockLevel', 'Stock', 'Quantity', 'Qty']);

            return {
                productName: name || 'Unknown Product',
                stockLevel: stock || 0,
                // store original object as 'extra' data if needed, or just let schema handle strict:false
                ...item
            };
        }).filter(item => item.productName !== 'Unknown Product'); // Filter out empty/invalid rows

        if (formattedData.length > 0) {
            await Inventory.insertMany(formattedData);
        }

        res.status(200).json({ message: "Inventory synced successfully", count: formattedData.length, data: formattedData });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to process file", error: err.message });
    }
});

// GET: Inventory
router.get('/', async (req, res) => {
    try {
        const inventory = await Inventory.find();
        res.status(200).json(inventory);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
