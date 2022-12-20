/**
 * ! Jour 1
 * 
 * * =======
 * 
 * ! Objectif #1
 * Créer une application Express et la faire écouter sur le port 3000
 * 1. On install Express
 * 2. Importer le package
 * 3. Initialiser notre application Express
 * 4. Créer le serveur et le faire écouter sur un port
 * 5. Tester l'application en lancant le serveur
 * 
 * ! Objetcif #2
 * Créer notre premier endpoint pour la liste des tâches
 * On a un fichier tasks.json qui représente nos data (simulera notre DB)
 * L'idée est donc de recup les datas de ce fichier et de les retourner au client
 * 1. Importer les datas depuis le fichier JSON
 * 2. Créer le endpoint pour la requête GET /tasks
 * 3. On répond les datas au format JSON
 * 4. On test notre endpoint avec un client HTTP
 * 
 * ! Objectif #3
 * * Exo autonomie : Faire le endpoint GET /tasks/:id avec sa documentation
 * 1. Créer le endpoint GET /tasks/:id
 * 2. Créer la documentation
 * 3. Tester avec un client HTTP
 * 
 * ! Objectif #4
 * * CORS
 * On va s'attaquer à ce petit soucis de CORS
 * 1. Découverte du concept et des enjeux
 * 2. Fiche recap markdown
 * 3. Mise en place des CORS sur notre API avec le package cors
 * https://expressjs.com/en/resources/middleware/cors.html
 * 4. On test
 */

/**
 * ! Jour 2
 * 
 * ========
 * 
 * ! Objectif #1
 * Endpoint POST /tasks. On veut rajouter une tâche dans la liste.
 * On va devoir passer le label de la nouvelle tâche dans le corps de la requête
 * Pour tester ça, on va passer par un client HTTP
 * 1. Créer le endpoint
 * 2. Recupérer le corps de la requête (et donc le label de la nouvelle tâche)
 * 3. Rajouter cette tâche à la liste (pas de persitence en DB mais on manipule un tableau de tâches à la place)
 * 4. Répondre au client : si tout est ok code HTTP 201 avec la nouvelle tâche en JSON. Sinon code 500
 * 5. Documentation Swagger
 * 
 * ! Objetcif #2
 * On va parler architecture
 * Notre code va vite devenir fouilli au fur et à mesure. Il va falloir réflichir à comment ranger 
 * correctement notre code pour maintenant une bonne lisibilité, maintenabilité et évolutivité !
 * Actuellement dans le même fichier on a :
 * - La mise en place du serveur
 * - La liste de nos endpoints
 * - Les fonctions métiers (celles qui manipulent les datas)
 * On va se créer des fichiers pour contenir chaque "logique"
 * - index.js => Le point d'entrée et lancement du serveur
 * - app/server.js => Initialisation du serveur et branchement des middlewares globaux
 * - app/router.js => La liste de nos routes
 * - app/controllers/ => Controllers contenant les fonctions métiers (manip de datas)
 * 
 * Les middlewares sont des fonctions misent les unes à la suite des autres.
 * Elles ont accès à la requête HTTP courante, à la réponse et à une fonction next()
 * qui permet de passer l'execution du code au prochian middleware.
 * Chaque middleware peut donc soit :
 * - Passer l'execution du code au prochain middleware
 * - Déclencher un process de réponse et donc ne pas passer le code au prochain middleware
 * https://expressjs.com/fr/guide/using-middleware.html
 * https://cdn-images-1.medium.com/max/1600/0*8HIzvtX-DA3C26uv.png
 */

// Import du server
const app = require('./app/server');
// On déifnit le port
const PORT = 3000;

const tasks = require('./data/tasks.json');
//* === Tasks ===
app.get('/tasks', function(request, response) {
  console.log(`${request.method} ${request.originalUrl}`);

  response.send(tasks);

  // Si on ne renvois rien au client, le processus de réponse tourne indéfiniment.
  // Pour terminer ce process, on utilise la méthode end() de l'objet Response
  // response.end();
});
// On peut mettre en place des endpoints dynamiques avec les ":" pour le param d'URL
app.get('/tasks/:id', function(req, res) {
  console.log(`${req.method} ${req.originalUrl}`);

  //https://expressjs.com/fr/4x/api.html#req.params
  // le param d'URL est de type string, il faut faire la conversion
  const taskId = parseInt(req.params.id, 10);
  const task = tasks.find((task) => task.id === taskId);
  // On renvois au client la tâche au format JSON
  res.json(task);
});
app.post('/tasks', function(req, res) {
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


// On met en écoute le serveur sur le port définit plus haut
app.listen(PORT, function() {
  console.log(`App is listening on port ${PORT}`);
});
