// jobs/cronJob.js
const cron = require('node-cron');
const { saveCryptoData } = require('../services/cryptoService');

// Schedule the job to run every 2 hours
cron.schedule('0 */2 * * *', async () => {
    console.log('Fetching cryptocurrency data...');
    await saveCryptoData();
});
