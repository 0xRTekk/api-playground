// Packages
const express = require('express');
const cors = require('cors');
// Imports
const router = require('./router.js');
const authRouter = require('./authRouter.js');
const logger = require('./middlewares/logger.js');
const bodySanitizer = require('./middlewares/bodySanitizer.js');

// Init du serveur
const app = express();

// On branche nos middlewares
app.use(cors());
app.use(express.json());
app.use(logger);
app.use(bodySanitizer);
app.use(router);
app.use(authRouter);

module.exports = app;
