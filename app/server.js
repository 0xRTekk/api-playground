// Packages
const express = require('express');
const cors = require('cors');

// Init du serveur
const app = express();

// On branche nos middlewares
app.use(cors());
app.use(express.json());

module.exports = app;
