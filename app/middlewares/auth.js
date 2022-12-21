const jwt = require('jsonwebtoken');

// Par mesure de sécurité, cette clé ne devrait pas être dans le code source
// => Il faut utiliser une variable d'environnement
const JWT_SECRET = 'SQRUFgsmufhWFOHGqsfg+95fdgwfSDFsdfQZGSDytsfwdf';

const authMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization && authorization.length > ('Bearer ').length) {
    // On recup le token après 'Bearer '
    const token = authorization.substring(('Bearer ').length);

    // On recup le token décodé
    const decodedPayload = jwt.verify(token, JWT_SECRET);
    // On place le payload décodé dans un header de la requête
    // Comme ça, dans les autres middlewares (et les fonctions de controllers), on va pour recup
    // les infos de l'utilisateurs pour lui renvoyer que ses tâches 
    req.headers.jwt_decoded = decodedPayload;

    next();
  } else {
    return res.status(401).end('Unauthorized');
  }
};

module.exports = authMiddleware;
