const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const users = require('../data/users.json');
const UsersController = require('./UsersController');

const AuthController = {
  // Par mesure de sécurité, cette clé ne devrait pas être dans le code source
  // => Il faut utiliser une variable d'environnement
  JWT_SECRET: 'SQRUFgsmufhWFOHGqsfg+95fdgwfSDFsdfQZGSDytsfwdf',

  login: (req, res) => {
    // Msg d'erreur si login/mdp pas fournis
    if (!req.body.login || req.body.login === '' || !req.body.password || req.body.password === '') {
      return res.status(400).end('BAD REQUEST');
    }

    // On cherche l'utilisateur
    const userResult = users.filter((user) => user.login == req.body.login);

    if (userResult.length === 0) {
      return res.status(404).end('USER NOT FOUND');
    } else if (userResult.length !== 1) {
      return res.status(500).end('INTERNAL ERROR');
    }

    // On recup l'utilisateur dans le tableau filtré
    const user = userResult[0];

    // On verif si le mdp fournit correspond au hash stocké en DB
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).send('Unauthorized');
    }

    //! Il faut supprimer le mdp de l'objet user pour ne pas l'envoyer au client
    const userToSend = UsersController.removePasswordInUser(user);

    // On crée le JWT à partir des infos de l'utilisateur authentifié et d'une phrase secrete
    const jwtCookie = jwt.sign(
      user,
      AuthController.JWT_SECRET,
      { expiresIn: '20m' }
    );

    // On rajoute le token dans l'objet user à renvoyer
    userToSend.jwt = jwtCookie;

    // On envoi la réponse au client
    return res.status(200).send(userToSend);
  }
}

module.exports = AuthController;
