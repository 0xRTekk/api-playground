import express from 'express';
import tasksController from './controllers/tasksController.js';

// On crée un nouveau router
// https://expressjs.com/en/4x/api.html#express.router
const router = express.Router();

//* === Tasks ===
router.get('/tasks', tasksController.getAllTasks);
router.get('/tasks/:id', tasksController.getTaskById);
router.post('/tasks', tasksController.createTask);
router.patch('/tasks/:id', tasksController.modifyTask);
router.put('/tasks/:id', tasksController.createOrModifyTask);
router.delete('/tasks/:id', tasksController.deleteTask);

export default router;
