# Tests

Quand on écrit du code, il y a toujours des bugs

- même si on est super fort,
- qu'on a fait très attention,
- qu'on est dans une équipe de "brutes",
- qu'on peut lire la matrice sans décodeur...

Pour éviter les bugs et régressions, on met en place des tests !

Un test, c'est du code qui exécute du code afin de vérifier si le résultat obtenu est bien celui attendu (valeur de retour, types attendus, ...)

## A quoi ça sert ?

- vérifier que le code fonctionne comme attendu et pour tous les cas
- découvrir les bugs le plus tôt possible
- stabiliser le code, empêcher les régressions, faire évoluer et améliorer le code
- pouvoir réécrire le code en changeant de bibliothèque, d'organisation des fichiers
- améliorer le code petit à petit
  - on voit un bug,
  - on écrit un test qui reproduit le bug,
  - on corrige le bug,
  - on rajoute un test pour s'assurer que ce bug ne reviendra plus ;)

## Tests fonctionnels

Test de bout en bout - un type de test qui teste que le flux d'une application du début à la fin fonctionne comme prévu. Ceci est également connu sous le nom de test fonctionnel. Un exemple de ce type de test consiste à tester un point de terminaison ou une route, ce qui implique de tester tout ce qui est nécessaire au fonctionnement du point de terminaison, comme la connexion à la base de données, les dépendances, etc.

## Outils

- Test Runner - une bibliothèque ou un outil qui récupère le code source (tests) dans un répertoire ou un fichier donné, exécute le test et écrit le résultat sur la console ou à tout emplacement spécifié, par exemple Jest, Mocha.

- Jest - Jest est un framework de test JavaScript développé par Facebook. Il fonctionne prêt à l'emploi avec une configuration minimale et dispose d'un testeur intégré, d'une bibliothèque d'assertions et d'un support de simulation.

- Supertest - Une bibliothèque pour tester les serveurs HTTP Node.js. Il nous permet d'envoyer par programmation des requêtes HTTP telles que GET, POST, PATCH, PUT, DELETE aux serveurs HTTP et d'obtenir des résultats.

## LETS' GO :rocket:

1. Install JEST & supertest
2. Configuration JEST
   1. Configuration dans `package.json`
   2. Création d'un dossier `tests/`
   3. Rajout d'un script pour lancer les tests
3. Ecrire un test
4. Lancer le test

```json
"jest": {
  "testEnvironment": "node",
  "coveragePathIgnorePatterns": [
    "/node_modules/"
  ],
  "roots": [
    "<rootDir>/tests/"
  ]
}
```
