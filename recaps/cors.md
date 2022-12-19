# Cross-Origin Ressource Sharing

[MDN](https://developer.mozilla.org/fr/docs/Web/HTTP/CORS)

[Wikipédia](https://fr.wikipedia.org/wiki/Cross-origin_resource_sharing)

## Principe de base

Pour certains types de requêtes seulement, un serveur web n'accepte des requêtes que si elles sont émises par une page ou un script appartenant au domaine dont il a la charge, sauf indication contraire.

Le standard CORS, défini par HTTP/1.1, est implémenté et automatiquement activé dans la plupart des serveurs et clients web modernes. Seule la version du serveur est véritablement importante : un vieux client web (navigateur, CURL…) ne supportant pas CORS mais dialoguant avec un serveur web supportant CORS ne crée pas de risque de sécurité. L'inverse n'est pas vrai !

## Exemples

### Exemple 1 : accès non-autorisé à une API

- Un serveur web expose une API sur api.monsite.fr à destination d'autres sites web du même réseau : service1.monsite.fr, service2.monsite.fr, etc.
- Un client toto.com essaye d'utiliser l'API, via une requête AJAX.
- Sans la mécanique CORS, toto.com peut accèder à l'API.
- Avec la mécanique CORS, toto.com ne peut pas accéder à l'API.

## Exemple 2 : vol de session utilisateur

- Un serveur web (légitime) s'occupe du domaine monsite.fr.
- Un autre serveur web (propriété de l'attaquant) s'occupe du domaine evilhacker.com.
- L'attaquant réussi à rediriger (discrètement ou pas) un client vers evilhacker.com.
- Puis…

### Sans la mécanique CORS

- Une requête AJAX avec withCredentials: true est émise depuis evilhacker.com à destination de monsite.fr et transporte les informations de session de monsite.fr (typiquement venant des cookies client).
- Le serveur monsite.fr répond avec des informations sensibles, propriété de l'utilisateur détenant la session volée par evilhacker.com.
- L'attaquant dispose d'information volées sensibles.

### Avec la mécanique CORS

- Une requête AJAX avec withCredentials: true est émise depuis evilhacker.com à destination de monsite.fr, mais CORS empêche à cette requête l'accès aux informations de session de monsite.fr (typiquement venant des cookies client), car les domaines d'émission (evilhacker.com) et de destination (monsite.fr) sont différents.
- Certains clients vont stopper net la requête. Même dans le cas où la requête est déclenchée, le serveur monsite.fr répondra à la requête en considérant qu'elle émise par un anonyme (pas d'information de session transportée).
- L'attaquant ne dispose d'aucune information volées ou sensibles.

## Exemple 3 : widget JS

- Un site de réseau social souhaite que d'autres sites web puissent afficher un petit widget clickable pour augmenter le trafic vers le réseau (penser bouton Twitter, +1 facebook, etc.)
- La mise en place du widget nécessite d'intégrer (requêtes GET) du code JS sur d'autres domaines que celui du réseau social et de déclencher une requête (POST) au clic.
- Sans la mécanique CORS, c'est possible.
- Avec la mécanique CORS, ce n'est plus possible.
- Pour autoriser la communication dans ce cas particulier et bien contrôlé, il faut mettre en place sur le serveur du réseau social une configuration CORS spécifique pour relâcher la contrainte Same-Origin Policy.

## Contournements possibles

### L'attaquant peut-il faire croire que l'origine de sa requête n'est pas evilhacker.com mais monsite.fr ?

Non, ce n'est normalement pas possible. Tout navigateur légitime va ignorer les tentatives de modification du header HTTP Origin ou l'accès aux cookies, localstorage… sur un domaine différent de celui d'émission de la requête. Toutefois, des navigateurs pirates peuvent implémenter les choses autrement, et être installés en lieu et place d'une version légitime…

### L'attaquant peut-il contourner ces sécurités coté client en initiant l'attaque depuis un serveur web ?

Non, ce n'est pas possible. Une requête initiée depuis un serveur web, à destination d'un serveur web, n'a par définition pas accès aux informations de session stocké chez le client.

### Tous les types de ressources sont-ils protégés par CORS ?

Non. CORS est un mécanisme de whitelisting : par défaut, un serveur web limite les accès en se basant sur le domaine d'émission de la requête (header HTTP Origin), sauf indication contraire (à l'aide des headers CORS). Cette restriction s'appelle la Same-Origin Policy, elle est notamment cruciale pour la gestion des sessions utilisateurs (typiquement transmises par un header HTTP), peu importe les moyens de stockage coté client (cookies, localstorage…) & serveur (en mémoire, en bdd…). Mais elle ne s'applique pas pour toutes les ressources : seules les requêtes AJAX (XHR, fetch), les fonts, les textures WebGL, certaines parties de CSS et des scripts JS sont concernés. Les images, les vidéos… et surtout les autres pages HTML (sur d'autres domaines) ne sont pas couverts par CORS !
