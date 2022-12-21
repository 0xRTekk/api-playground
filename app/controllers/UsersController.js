// Importing the NPM bcrypt package.
import bcrypt from 'bcrypt';
// We are setting salt rounds, higher is safer.
const saltRounds = 10;

import users from '../data/users.json' assert { type: "json" };

const UsersController = {
  // Retourne tous les utilisateurs
  getAllUsers: function (req, res) {
    try {
      // on nettoye le tableau pour ne pas renvoyer le mot de passe
      // (même s'il est hashé, c'est une mauvaise pratique)
      let usersReturn = [];
      for (let user of users) {
        const userWithOutPassword = UsersController.removePasswordInUser(user);
        usersReturn.push(userWithOutPassword);
      }

      res.send(usersReturn);
    } catch (error) {
      console.error(error);
      res.status(500).end();
    };
  },

  getOneUser: function (req, res) {
    const id = parseInt(req.params.id, 10);
    try {
      const user = users.find((user) => user.id === id);

      if (user) {
        const userWithOutPassword = UsersController.removePasswordInUser(user);
        res.send(userWithOutPassword);
      } else {
        res.status(404).end();
      }

    } catch (error) {
      console.error(error);
      res.status(500).end();
    };
  },

  createUser: function (req, res) {
    // On recup les ids
    const usersIds = users.map((user) => user.id);
    // Pour trouver le plus haut
    const maxId = Math.max(...usersIds);

    // On hash le mdp avant de l'enregistrer
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
      const newUser = {
        id: maxId + 1,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        pseudo: req.body.pseudo,
        password: hash,
      };

      try {
        users.push(newUser);

        const userWithOutPassword = UsersController.removePasswordInUser(newUser);
        res.status(201).send(userWithOutPassword);
      } catch (error) {
        console.error(error);
        res.status(500).end();
      }
    });
  },

  modifyUser: function (req, res) {
    const id = parseInt(req.params.id, 10);
    const user = users.find((user) => user.id === id);
    if (!user) {
      res.status(404).send(`Can't find the user#${id}`);
    } else {
      // On ne change que les paramètres présents
      if (req.body.firstName) {
        user.firstName = req.body.firstName;
      }
      if (req.body.lastName) {
        user.lastName = req.body.lastName;
      }
      if (req.body.pseudo) {
        user.pseudo = req.body.pseudo;
      }
      if (req.body.password) {
        // On hash le mdp avant de l'enregistrer
        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
          user.password = hash;
        });
      }

      const userWithOutPassword = UsersController.removePasswordInUser(user);
      res.send(userWithOutPassword);
    }
  },

  createOrModifyUser: function (req, res) {
    const id = parseInt(req.params.id, 10);
    const user = users.find((user) => user.id === id);
    if (user) {
      UsersController.modifyUser(req, res);
    } else {
      UsersController.createUser(req, res);
    }
  },

  deleteUser: function (req, res) {
    const id = parseInt(req.params.id, 10);
    const user = users.find((user) => user.id === id);
    if (!user) {
      res.status(404).send(`Can't find the user#${id}`);
    } else {
      // On parcours notre tableau de tâches
      for (let i = 0; i < users.length; i++) {
        // On trouve la tâche qui nous interesse
        if (users[i].id === id) {
          // On l'enlève du tableau
          users.splice(i, 1);
        }
      }
      res.send('OK');
    }
  },

  removePasswordInUser: (user) => {
    const userCopy = { ...user };
    delete userCopy.password;
    return userCopy;
  }


};

export default UsersController;