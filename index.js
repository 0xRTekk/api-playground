/**
 * ! Objectif #1
 * Créer une application Express et la faire écouter sur le port 3000
 * 1. On install Express
 * 2. Importer le package
 * 3. Initialiser notre application Express
 * 4. Créer le serveur et le faire écouter sur un port
 * 5. Tester l'application en lancant le serveur
 */

// Application Expresse, on importe le package
const express = require('express');
// On initialise l'application Express
const app = express();

// On déifnit le port
const PORT = 3000;

// On met en écoute le serveur sur le port définit plus haut
app.listen(PORT, function() {
  console.log(`App is listening on port ${PORT}`);
});
