# Définition des besoins

Nous avons une app front fonctionnelle qui se base sur des données de tests. L'idée serait de fournir une API REST que le front pourra consommer.

Il nous faudra donc une gestion des tâches mais aussi des utilisateurs.

## API gestion des tâches

- `GET /tasks` => Retourne la liste complète des tâches
- `GET /tasks/:id` => Retourne une tâche en particulier
- `POST /tasks` => Enregistre une nouvelle tâche
- `PUT /tasks/:id` => Modifier entièrement une tâche
- `PATCH /tasks/:id` => Modifie partiellement une tâche
- `DELETE /tasks/:id` => Supprime une tâche

## API gestion des utilisateurs

- `GET /users` => Retourne la liste complète des utilisateurs
- `GET /users/:id` => Retourne une untilisateur en particulier
- `POST /users` => Enregistre une nouvelle untilisateur
- `PUT /users/:id` => Modifier entièrement une untilisateur
- `PATCH /users/:id` => Modifie partiellement une untilisateur
- `DELETE /users/:id` => Supprime une untilisateur
