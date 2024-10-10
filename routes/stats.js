// routes/stats.js
const express = require('express');
const Crypto = require('../models/crypto');
const router = express.Router();

router.get('/stats', async (req, res) => {
    const { coin } = req.query;
    const latestRecord = await Crypto.findOne({ coin }).sort({ timestamp: -1 });
    if (!latestRecord) {
        return res.status(404).json({ message: 'No data found for this coin' });
    }
    res.json({
        price: latestRecord.price,
        marketCap: latestRecord.marketCap,
        '24hChange': latestRecord.change24h
    });
});

module.exports = router;
