# API REST

C'est parti !

---

## Bienvenue

- O'Clock <!-- .element: class="fragment" -->
  - Notre école
  - Votre formateur
- Vous ?<!-- .element: class="fragment" -->
  - Votre connaissance/expérience en développement 
  - Votre poste / entreprise ?
  - Ce que vous savez déja faire en 2022 ?<!-- .element: class="fragment" -->
    - JS vanilla ?
    - JS Front ?
    - JS Back ?
    - Framework / librairie JS ?
  - A l'aise en anglais ? Avec git / Github ?<!-- .element: class="fragment" -->

---

## Contenu de cette formation

- Ce que l'on va apprendre !<!-- .element: class="fragment" -->
  - Comprendre la norme REST
  - Comprendre comment REST est devenu la norme
  - Connaître les conventions de nommage des API REST
  - Mettre en place des tests fonctionnels sur une API
  - Comprendre comment est consommée une API
  - Documenter son API
  - Sécuriser son API
  - Lister les outils
  - Découvrir des utilisations avancées d’API REST

---

## Détail des 3 jours

- Jour 1 : Généralités & API REST <!-- .element: class="fragment" -->
  - définir le protocole HTTP
  - définir le standard JSON
  - définir la norme, les contraintes et l'architecture d'une API RESTful
  - créer ses premiers endpoints dans une application NodeJS/Express
  - tester ses endpoints à l'aide d'un client HTTP
  - documenter une API à l'aide d'API Swagger
- Jour 2 : API complète, Sécurité & notions avancées  <!-- .element: class="fragment" -->
  - produire une API REST complète (lecture, ajout, modification & suppression)
  - différencier les principaux risques de sécurité
  - sécuriser et valider les données entrantes d'une API REST
  - évaluer la maturité d'une API REST en se basant sur le modèle de Richardson
- Jour 3 : Consommation, Authentification & Tests <!-- .element: class="fragment" -->
  - mettre en place des tests fonctionnels d'API
  - quand et comment versionner une API
  - consommer une API REST dans un projet front-end
  - définir les différentes méthodes d'authentification d'une API
  - Mettre en place un système d'authentification à l'aide d'un JWT
  - définir ce qu'est un agrégateur de données tel que GraphQL
  - découvrir de nouveaux outils (API Plateform, JSON Generator, JSON Server, ...)

---

## Des questions ?

- n'hésitez pas à nous interrompre a tout moment !
- avec le `@question`, c'est mieux !
  - ca fait un petit bruit dans nos oreilles !
  - et ca reste affiché dans le channel "questions !"

---

## Application Programming Interface

*interface de programmation applicative*

>"Une interface de programmation est une façade clairement délimitée par laquelle un logiciel offre des services à d'autres logiciels"

--

## API simples

Quelques exemples:
<ul>
<li class="fragment">Les modules de NodeJS (natifs et npm), qui exposent des méthodes.</li>
<li class="fragment">Un serveur de base de données, via le langage SQL.</li>
<li class="fragment">Le système d'exploitation, via la ligne de commande.</li>
<li class="fragment">Et même Javascript !!</li>
<li class="fragment">(en effet, "déclarer une variable" ou "afficher un truc dans la console" sont des <i>services</i>)</li>
</ul>

---

## API Web

Une API web est une API qui fonctionne à travers le standard HTTP.

Avant d'aller plus loin, on va revoir ce qu'est le protocole HTTP !

--

## HTTP ?

Même si on ne sait pas ce que ces 4 lettres signifient, on les a toutes et tous vues dans la barre d’adresse de notre navigateur. HTTP est un protocole, c’est à dire une façon de communiquer qui est normalisée.<!-- .element: class="fragment" -->

Le client ET le serveur parlent le HTTP, ce qui est quand même pratique pour se comprendre. Le client (le navigateur) fait une requête HTTP, le serveur (notre application Node.js) lui répond avec une réponse HTTP.<!-- .element: class="fragment" -->

HTTP est donc la langue commune que le client et le serveur utilisent pour se comprendre, se demander et se répondre du contenu.<!-- .element: class="fragment" -->

--

![http](recaps/medias/apir/http.png)

--

## API Web

Comme on le disait : une API web est une API qui fonctionne à travers le standard HTTP.

Par définition, un site web "classique" est une API web, qui renvoie du HTML.

Mais par abus de langage, on appelle "API" (tout court), les API web qui renvoient autre chose que du HTML.

<p class="fragment">ah bon? mais ça renvoie quoi du coup ?</p>

---

## Formats de donnée

Les API web renvoient en fait toutes la même chose :
<p class="fragment">Du texte !</p>

<p class="fragment">Pour que ce texte soit interprétable (qu'il veuille dire quelquechose), il faut qu'il respecte un format.</p>

--

## Formats de donnée

Quelques formats standards:

- HTML (HyperText Markup Langage)
- XML (eXtensible Markup Langage)
- YAML (Yet Another Markup Langage)
- JSON (JavaScript Objet Notation)

--

## JSON

Un des formats les plus utilisés. Et le plus pratique pour nous (y'a Javascript dans le nom, pas de surprise...)

Pour transformer un objet JS en JSON :

- échapper tous les noms des propriétés avec des ""
- c'est tout. Oui oui, c'est tout !

--

## Toto-matic

Le module natif `JSON` possède 2 méthodes :

- `JSON.stringify` transforme un objet en sa représentation JSON (renvoie donc une string)
- `JSON.parse` fait l'inverse ! (et renvoie donc un objet)

Et le mieux, c'est que ce module existe partout : dans Node et dans tous les navigateurs !

---

## Un exemple

Soit l'objet suivant :

```js
const monObj = {
  name: "mon Objet",
  isPossible: true,
  subObj: {
    list: [1,2,3]
  }
}
```

<p class="fragment">
Sa représentation en JSON est :
<br/>
<code>
'{"name":"mon Objet","isPossible":true,"subObj":{"list":[1,2,3]}}'
</code>

</p>

--

## Un exemple

Juste par curiosité, voici à quoi le même objet ressemblerait dans d'autres formats

En XML:

```xml
<monObj name="mon Objet" isPossible="true">
  <subObj>
    <list value="1">
    <list value="2">
    <list value="3">
  </subObj>
</monObj>
```

(ouais, la notation des listes, c'est pas simple...)

--

En YAML:

```yaml
monObj:
  name: mon Objet
  isPossible: true
  subObj:
    list:
      - 1
      - 2
      - 3
```

---

## Et alors ?

Quel est l'intêret des API ?

<p class="fragment">La séparation des concepts !</p>

<p class="fragment">Une API expose les données ainsi que les services pour les créer/modifier/supprimer. On va pouvoir y "brancher" toutes les interfaces graphiques qu'on veut !</p>

---

## Archi v2.0

On passe d'une application "monolithique" (qui fait tout d'un coup)

À un couple (voir une série) d'applications qui fonctionnent en collaboration.

--

![monolith_vs_api](/recaps/medias/apir/monolith_vs_simple_api.png)

--

## Plusieurs interfaces, une seule logique

![multi_front](/recaps/medias/apir/api-maps-768x512.png)

--

## Et pour les API Web ?

Dans le monde du web, on utilise le concept d’API RESTful avec le protocole HTTP.

En effet, nous avons un navigateur qui est capable d’envoyer des requêtes HTTP. Nous allons donc utiliser ce moyen de communication prêt à l’emploi pour permettre à une page web d’échanger des informations avec un serveur pour récupérer, insérer, modifier et supprimer des données.

--

![rest_api](/recaps/medias/apir/rest-api.png)

--

## Les 6 règles du REST (ou RESTful)

>REpresentational State Transfer : standard ou « langage » lors des demandes sur le réseau

1. Interface uniforme
2. Client / serveur
3. Stateless
4. Mise en cache
5. Système en couche
6. Code à la demande (opitonnel)
