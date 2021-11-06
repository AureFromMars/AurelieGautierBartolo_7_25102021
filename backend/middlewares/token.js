const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.User;// User model

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET.toString());
    // console.log('blabla');
    // console.log(decodedToken);

    // User.findOne({attributes: ['id', 'isAdmin'], where : { id: decodedToken.userId}})
    // .then((user) => {
    //   console.log(user);

    //   if (user) {
        req.token = decodedToken;
    //     req.token.isAdmin = user.isAdmin;
    //   } else {
    //     throw "Vous n'êtes pas utilisateur";
    //   }
    // });
    next();
  } catch (error) {
    res.status(406).json({ error });
  }
};