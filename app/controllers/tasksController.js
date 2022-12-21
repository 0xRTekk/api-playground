const tasks = require('../data/tasks.json');

const tasksController = {
  getAllTasks: (req, res) => {
    if (!tasks) {
      return res.status(404).end();
    }
    // On recup les infos traitées par le middleware Auth pour en extraire l'utilisateur
    const currentUser = req.headers.jwt_decoded;

    // On filtre les tâches de l'utilisateur authentifié
    const userTasks = tasks.filter((task) => task.userId === currentUser.id);

    res.send(userTasks);
  },
  getTaskById: (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
      res.json(task);
    } else {
      res.status(404).end('404 NOT FOUND');
    }
  },
  createTask: (req, res) => {
    if (req.body.label === undefined || req.body.label === "") {
      return res.status(400).end('The task\'s name is empty');
    };

    // On recup les ids existants et on recup le plus haut pour calculer le nouveau
    const tasksIds = tasks.map((task) => task.id);
    const maxId = Math.max(...tasksIds) + 1;

    // On prépare la nouvelle tâche
    const newTask = {
      id: maxId,
      label: req.body.label,
      done: false,
      userId: 1
    };

    // On l'a rajoute dans le tableau des tâches
    try {
      tasks.push(newTask);
      // Si la création de la ressource est ok
      // on répond un code 201 Created et on envoi la nouvelle tâche
      res.status(201).json(newTask);
    } catch (error) {
      // Si la création ne passe pas
      // on répond un code 500 Internal Error et on termine le processus de réponse
      console.error(error);
      res.status(500).end(error);
    }
  },

  modifyTask: function (req, res) {
    const id = parseInt(req.params.id, 10);
    const task = tasks.find((task) => task.id === id);
    if (!task) {
      res.status(404).send(`Can't find the task#${id}`);
    } else {
      // On ne change que les paramètres présents
      if (req.body.label) {
        task.label = req.body.label;
      }
      if (req.body.done !== null) {
        task.done = req.body.done ? true : false;
      }

      res.send(task);
    }
  },

  createOrModifyTask: function (req, res) {
    const id = parseInt(req.params.id, 10);
    const task = tasks.find((task) => task.id === id);
    if (task) {
      tasksController.modifyTask(req, res);
    } else {
      tasksController.createTask(req, res);
    }
  },

  deleteTask: function (req, res) {
    const id = parseInt(req.params.id, 10);
    const task = tasks.find((task) => task.id === id);
    if (!task) {
      res.status(404).send(`Can't find the task#${id}`);
    } else {
      // On parcours notre tableau de tâches
      for (let i = 0; i < tasks.length; i++) {
        // On trouve la tâche qui nous interesse
        if (tasks[i].id === id) {
          // On l'enlève du tableau
          tasks.splice(i, 1);
        }
      }
      res.send('OK');
    }
  },


};

module.exports = tasksController;