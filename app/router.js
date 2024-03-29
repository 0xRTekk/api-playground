const express = require('express');
const tasksController = require('./controllers/tasksController.js');
const UsersController = require('./controllers/UsersController.js');
const authMiddleware = require('./middlewares/auth.js');


// On crée un nouveau router
// https://expressjs.com/en/4x/api.html#express.router
const router = express.Router();

// On branche le middleware d'autentification sur nos routes
router.use(authMiddleware);

//* === Tasks ===
router.get('/tasks', tasksController.getAllTasks);
router.get('/tasks/:id', tasksController.getTaskById);
router.post('/tasks', tasksController.createTask);
router.patch('/tasks/:id', tasksController.modifyTask);
router.put('/tasks/:id', tasksController.createOrModifyTask);
router.delete('/tasks/:id', tasksController.deleteTask);

// ===== Users =====
router.get('/users', UsersController.getAllUsers);
router.get('/users/:id', UsersController.getOneUser);
router.post('/users', UsersController.createUser);
router.patch('/users/:id', UsersController.modifyUser);
router.put('/users/:id', UsersController.createOrModifyUser);
router.delete('/users/:id', UsersController.deleteUser);

module.exports = router;
