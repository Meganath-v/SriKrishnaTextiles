const express = require('express');
const router = express.Router();
const Recruitment = require('../models/Recruitment');

// POST: Submit a job application
router.post('/apply', async (req, res) => {
    try {
        const newApplication = new Recruitment(req.body);
        const savedApp = await newApplication.save();
        res.status(201).json({ message: "Application submitted successfully", data: savedApp });
    } catch (err) {
        console.error("Recruitment Apply Error:", err);
        res.status(500).json({ message: "Failed to submit application", error: err.message });
    }
});

// GET: Fetch all applications (Admin only ideally, but public for now as per simple scope)
router.get('/', async (req, res) => {
    try {
        const applications = await Recruitment.find().sort({ createdAt: -1 });
        res.status(200).json(applications);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch applications", error: err.message });
    }
});

module.exports = router;
