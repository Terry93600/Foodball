// authMiddleware.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  jwt.verify(token, 'clé_secrète', (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: 'Authentification échouée' });
    }
    req.userId = decodedToken.userId;
    next();
  });
};

module.exports = verifyToken;
