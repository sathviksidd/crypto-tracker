// routes/deviation.js
const express = require('express');
const Crypto = require('../models/crypto');
const router = express.Router();

router.get('/deviation', async (req, res) => {
    const { coin } = req.query;
    const records = await Crypto.find({ coin }).sort({ timestamp: -1 }).limit(100);
    
    if (records.length === 0) {
        return res.status(404).json({ message: 'No data available for deviation calculation' });
    }

    const prices = records.map(record => record.price);
    const mean = prices.reduce((acc, price) => acc + price, 0) / prices.length;
    const variance = prices.reduce((acc, price) => acc + Math.pow(price - mean, 2), 0) / prices.length;
    const deviation = Math.sqrt(variance);

    res.json({ deviation: deviation.toFixed(2) });
});

module.exports = router;
