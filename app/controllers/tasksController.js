import tasks from '../data/tasks.json' assert { type: "json" };

const tasksController = {
  getAllTasks: (req, res) => {
    console.log(`${req.method} ${req.originalUrl}`);
    res.send(tasks);
  },
  getTaskById: (req, res) => {
    console.log(`${req.method} ${req.originalUrl}`);
    const taskId = parseInt(req.params.id, 10);
    const task = tasks.find((task) => task.id === taskId);
    res.json(task);
  },
  createTask: (req, res) => {
    console.log(`${req.method} ${req.originalUrl}`);

    if(req.body.label === undefined || req.body.label === "") {
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
};

export default tasksController;