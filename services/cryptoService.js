// services/cryptoService.js
const axios = require('axios');
const CoinGeckoAPI = "https://api.coingecko.com/api/v3/simple/price";
const Crypto = require('../models/crypto');

const fetchCryptoData = async (coinId) => {
    const url = `${CoinGeckoAPI}?ids=${coinId}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`;
    const response = await axios.get(url);
    const data = response.data[coinId];
    return {
        price: data.usd,
        marketCap: data.usd_market_cap,
        change24h: data.usd_24h_change
    };
};

const saveCryptoData = async () => {
    const coins = ['bitcoin', 'matic-network', 'ethereum'];
    for (const coin of coins) {
        const data = await fetchCryptoData(coin);
        await Crypto.create({
            coin,
            price: data.price,
            marketCap: data.marketCap,
            change24h: data.change24h
        });
    }
};

module.exports = { saveCryptoData };
