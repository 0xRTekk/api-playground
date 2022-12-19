/**
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
 */

// Application Expresse, on importe le package
const express = require('express');
// On initialise l'application Express
const app = express();
// On importe nos datas
const tasks = require('./data/tasks.json');
// On déifnit le port
const PORT = 3000;


//* === ENDPOINTS ===
app.get('/tasks', function(request, response) {
  console.log(`${request.method} ${request.originalUrl}`);

  response.send(tasks);

  // Si on ne renvois rien au client, le processus de réponse tourne indéfiniment.
  // Pour terminer ce process, on utilise la méthode end() de l'objet Response
  // response.end();
});



// On met en écoute le serveur sur le port définit plus haut
app.listen(PORT, function() {
  console.log(`App is listening on port ${PORT}`);
});
