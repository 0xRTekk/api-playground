const express = require('express');

// On crée un nouveau router
// https://expressjs.com/en/4x/api.html#express.router
const router = express.Router();

const tasks = require('./data/tasks.json');
//* === Tasks ===
router.get('/tasks', function(request, response) {
  console.log(`${request.method} ${request.originalUrl}`);

  response.send(tasks);

  // Si on ne renvois rien au client, le processus de réponse tourne indéfiniment.
  // Pour terminer ce process, on utilise la méthode end() de l'objet Response
  // response.end();
});
router.get('/tasks/:id', function(req, res) {
  console.log(`${req.method} ${req.originalUrl}`);

  //https://expressjs.com/fr/4x/api.html#req.params
  // le param d'URL est de type string, il faut faire la conversion
  const taskId = parseInt(req.params.id, 10);
  const task = tasks.find((task) => task.id === taskId);
  // On renvois au client la tâche au format JSON
  res.json(task);
});
router.post('/tasks', function(req, res) {
  console.log(`${req.method} ${req.originalUrl}`);

  if(req.body.label === undefined || req.body.label === "") {
    return res.status(400).end('The task\'s name is empty');
  };

  // On prépare la nouvelle tâche
  const newTask = {
    id: 99, // On vera plus tard comment faire ça prorpement
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
});

module.exports = router;
