# Versionning

Le changement d'une API est inévitable à mesure que nos connaissances et notre expérience d'un système s'améliorent.

La gestion de l'impact de ce changement peut être un véritable défi lorsqu'il menace de rompre l'intégration des clients existants.

## Quand versionner ?

Lorsqu'on applique des changements qui "casserait" l'utilisation de l'API

- une modification du format des données de réponse pour un ou plusieurs appels
- une modification du type de requête ou de réponse (ex: modification d'un entier en flottant)
- supprimer n'importe quelle partie de l'API.

Les modifications avec rupture doivent toujours entraîner une modification du numéro de version principal d'une API.

## Comment versionner ?

Il n'existe aucune directives spécifique mais plutôt des approches couramment utilisées :

### URI Versioning

L'approche la plus simple et la plus courante, bien qu'elle viole le principe selon lequel un URI doit faire référence à une ressource unique.

On est sûr de rompre l'intégration du client lorsqu'une version est mise à jour.

```plaintext
http://api.exemple.com/v1
http://apiv1.exemple.com
```

### Custom Request Header

Permet de conserver les URI entre les versions. On met en place un header personnalisé côté client.

```plaintext
Accept-version: v1
Accept-version: v2
```

### "Accept" Header

L'en-tête HTTP Accept indique quels types de contenu, exprimés en tant que types MIME, le client est capable de comprendre.

On a la possibilité également de spécifier la version de la ressource qu'on accepte côté client

```plaintext
Accept: application/vnd.example.v1+json
Accept: application/vnd.example+json;version=1.0
```

## Pour finir

Dans le monde réel, une API ne sera jamais complètement stable. Il est donc important de savoir comment ce changement est géré.

Il faut bien garder en tête qu'il n'y a pas de directives à suivre quant au versionnenent de notre API (qui est inévitable).

Il y a seulement des approches courantes que le peu utiliser. La plus courante et simple à mettre en place est le changement de l'URI.

Une dépréciation progressive et bien documentée de l'API peut être une pratique acceptable pour la plupart des API.