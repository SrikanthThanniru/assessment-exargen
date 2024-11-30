const express = require('express');
const Timer = require('../models/Timer');
const router = express.Router();

// Start timer
router.post('/start', async (req, res) => {
    try {
        const timer = new Timer({ assessment_start_time: new Date() });
        await timer.save();
        res.status(201).json(timer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Complete timer
router.put('/complete/:id', async (req, res) => {
    try {
        const timer = await Timer.findById(req.params.id);
        if (!timer) return res.status(404).json({ error: "Timer not found" });

        timer.assessment_end_time = new Date();
        await timer.save();
        res.status(200).json(timer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Fetch timer
router.get('/:id', async (req, res) => {
    try {
        console.log("Fetching timer with ID:", req.params.id); 
        const timer = await Timer.findById(req.params.id);
        if (!timer) {
            console.log("Timer not found");
            return res.status(404).json({ error: "Timer not found" });
        }
        res.status(200).json(timer);
    } catch (err) {
        console.error("Error fetching timer:", err); 
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
