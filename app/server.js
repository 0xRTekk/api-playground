// Packages
import express from 'express';
import cors from 'cors';
// Imports
import router from './router.js';
import logger from './middlewares/logger.js';

// Init du serveur
const app = express();

// On branche nos middlewares
app.use(cors());
app.use(express.json());
app.use(logger);
app.use(router);

export default app;
