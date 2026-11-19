const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { dbConnection } = require('./database/config');

// Create express server
const app = express();

// database
dbConnection();

// CORS
app.use(cors());

// public directory
app.use(express.static('public'));

// Parse to json
app.use(express.json());

// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// listen requests
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});