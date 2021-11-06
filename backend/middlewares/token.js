const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    req.token = decodedToken;

    // const userId = decodedToken.userId;// Failles de sécurité !!!
    // if (req.body.userId && req.body.userId !== userId) {
    //   throw "Identifiant d\'utilisateur invalide !";
    // } else {
      next();
    // }
  } catch (error) {
    res.status(401).json({ error });
  }
};