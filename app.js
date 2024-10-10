
const express = require('express');
const mongoose = require('mongoose');
const statsRoute = require('./routes/stats');
const deviationRoute = require('./routes/deviation');
require('./jobs/cronJob'); 

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('paste_your_mongoDB_URL')
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); 
  });

app.use(express.json());

// API routes
app.use('/api', statsRoute);
app.use('/api', deviationRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
