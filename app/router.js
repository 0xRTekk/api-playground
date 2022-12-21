const express = require('express');
const tasksController = require('./controllers/tasksController.js');
const UsersController = require('./controllers/UsersController.js');
const AuthController = require('./controllers/AuthController.js');


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

// ===== Users =====
router.get('/users', UsersController.getAllUsers);
router.get('/users/:id', UsersController.getOneUser);
router.post('/users', UsersController.createUser);
router.patch('/users/:id', UsersController.modifyUser);
router.put('/users/:id', UsersController.createOrModifyUser);
router.delete('/users/:id', UsersController.deleteUser);

// ==== Auth ====
router.post('/login', AuthController.login);

module.exports = router;
