// Packages
const express = require('express');
const cors = require('cors');
// Imports
const router = require('./router');

// Init du serveur
const app = express();

// On branche nos middlewares
app.use(cors());
app.use(express.json());
app.use(router);

module.exports = app;
