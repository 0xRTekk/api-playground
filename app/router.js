import express from 'express';
import tasksController from './controllers/tasksController.js';

// On crée un nouveau router
// https://expressjs.com/en/4x/api.html#express.router
const router = express.Router();

//* === Tasks ===
router.get('/tasks', tasksController.getAllTasks);
router.get('/tasks/:id', tasksController.getTaskById);
router.post('/tasks', tasksController.createTask);

export default router;
