const { JSDOM } = require('jsdom');
const DOMPurify = require('dompurify');

// On "émule" un context de navigateur pour fiare fonctionner la lib DOMPurify côté serveur
// https://github.com/cure53/DOMPurify
const window = new JSDOM('').window;
const purify = DOMPurify(window);

const bodySanitizer = (req, res, next) => {
  if(req.body) {
    for (let propName in req.body) {
      //console.log(`propName : ${propName}`);
      //console.log(`propValue : ${req.body[propName]}`);
      // On echape les caractères speciaux HTML
      req.body[propName] = purify.sanitize(
        req.body[propName],
        {USE_PROFILES: {html: true}}
      );
    }
  }
  next();
};

module.exports = bodySanitizer;
