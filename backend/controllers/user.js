/* ATTENTION, pour switch de type de requête JSON ou mutipart/form-data avec POSTMAN :
- j'ai créé des switch de méthodes entre req.file/req.user et req.body.user
- A UNIFORMISER SI LE TEMPS ME LE PERMET !!
- Sinon : "refactorisation" impérative pour la suite !*/

// Imports
const db = require('../models');
const User = db.User;// User model
const Message = db.Message;// Message model
const Comment = db.Comment;// Comment model
const Liking = db.Liking;// Liking model
// const {User, Message, Comment, Liking} = require('../models');// Equals to lines above
const bcrypt = require('bcrypt');// Bcrypt package and set salt to hash password
const saltRounds = 10;// Allows to complexify encrypt executing 10 times the hashing algorithm
const cryptoJs = require('crypto-js');// Crypto-js package to encrypt than decrypt email
const jwt = require('jsonwebtoken');// jsonwebtoken package to create a token
const token = require('../middlewares/token');// SUPP ############################################################################?????????????????????????????????????????????????????
const fs = require('fs');// File system Node module to manager files

exports.register = (req, res, next) => {// For further cases IRL : create a specific route to uploads images because multer allows to upload even if User ins't valid
  if (req.file) {
    const userObject = {
      ...JSON.parse(req.body.user),
      imageUrl: `${req.protocol}://${req.get('host')}/images/users/${req.file.filename}`
    };
    const encryptEmail = cryptoJs.HmacSHA256(userObject.email, process.env.EMAIL_ENCRYPT_KEY).toString();// Encryption that can be further decrypted
    bcrypt.hash(userObject.password, saltRounds)// Hashing password to encrypt with SHA 512 Bit... allows to compare 2 files that should be the same if not corrupted, but never decrypted
    .then((hash) => {
      delete userObject.id;
      User.create({// Either .built then .save || .create // .save doesn't store images
        ...userObject,
        email: encryptEmail,
        password: hash
      })
      .then(() => res.status(201).json({ message: "Utilisateur enregistré !"}))
    })
    // .catch(error => res.status(454).json({ error }));// Recode the number #################################################
  } else {
    const encryptEmail = cryptoJs.HmacSHA256(req.body.email, process.env.EMAIL_ENCRYPT_KEY).toString();// Encryption that can be further decrypted
    bcrypt.hash(req.body.password, saltRounds)
    .then((hash) => {
      delete req.body.id;
      User.create({
        ...req.body,
        email: encryptEmail,
        password: hash
      })
      .then(() => res.status(201).json({ message: "Utilisateur enregistré !"}))
    })
    // .catch(error => res.status(456).json({ error }));// Recode the number #################################################
  }
};

// Login authentification
exports.login = (req, res, next) => {
	const decryptEmail = cryptoJs.HmacSHA256(req.body.email, process.env.EMAIL_ENCRYPT_KEY).toString();
	User.findOne({where : { email: decryptEmail }})// Check if users exists in DB
	.then(user => {
		if (!user) {// If not User => no access
			res.status(401).json({ message: "User not found !" });
      return;
		};
		bcrypt.compare(req.body.password, user.password)// Check
		.then(valid => {
			if (!valid) {
				res.status(401).json({ message: "Password failed !" });
        return;// Password failed // If...return, then no need to write else because stop the instruction
			} else {
				res.status(200).json({
					userId: user.id,
          isAdmin: user.isAdmin,
					token: jwt.sign(
						{ userId: user.id }, process.env.TOKEN_SECRET.toString(), { expiresIn: '2h' }
					),
					message: "Utilisateur connecté !"
				})
				// .catch(error => res.status(400).json({ error }));// Recode the number #################################################
			};
		})
		// .catch(error => res.status(501).json({ error }));// Recode the number #################################################
	})
	// .catch(error => res.status(502).json({ error }));// Recode the number #################################################
};

exports.getAllUsers = (req, res, next) => {
	User.findAll()
	.then((messages) => res.status(200).json(messages))
	.catch(error => res.status(400).json({ error }));
};

exports.getOneUser = (req, res, next) => {
	User.findOne({
    where : { id: req.params.id},
    include: [
      { model: Message},
      { model: Comment},
      { model: Liking}
    ]
  })
	.then((messages) => res.status(200).json(messages))
	.catch(error => res.status(400).json({ error }));
};

exports.modifyUser = (req, res, next) => {
  if(req.token.userId !== req.params.id) {// If I am not owner then am I Admin ?
    User.findOne({attributes: ['id', 'isAdmin'], where : { id: req.token.userId}})
    .then((user) => {
      if (!user.isAdmin) {// If not Admin => no access
        res.status(401).json({ message: "Vous n'êtes pas autorisé à modifier cet utilisateur !"});
        return ;
      };
    })
  };
  User.findOne({where : { id: req.params.id}})
  .then(user => {
    if (req.file) {
      const userObject = {
        ...JSON.parse(req.body.user),
        imageUrl: `${req.protocol}://${req.get('host')}/images/users/${req.file.filename}`
      };
      if (user.imageUrl == null || user.imageUrl == "") {
        User.update(userObject, { where: { id: req.params.id }})
        .then(() => res.status(200).json({ message: "Utilisateur modifié !"}))
        // .catch(error => res.status(400).json({ error }));
      } else {
        const filename = user.imageUrl.split('/images/users/')[1];
        fs.unlink('images/users/' + filename, () => {
          User.update(userObject, { where: { id: req.params.id }})
          .then(() => res.status(200).json({ message: "Utilisateur modifié !"}))
          // .catch(error => res.status(400).json({ error }));
        });
      }
    } else {
      User.update(req.body, { where: { id: req.params.id }})
      .then(() => res.status(200).json({ message: "Utilisateur modifié !"}))
      // .catch(error => res.status(400).json({ error }));
    };
  })
};

exports.deleteUser = (req, res, next) => {
  if(req.token.userId !== req.params.id) {// If I am not owner then am I Admin ?
    User.findOne({attributes: ['id', 'isAdmin'], where : { id: req.token.userId}})
    .then((user) => {
      if (!user.isAdmin) {// If I am not Admin => no access
        res.status(401).json({ message: "Vous n'êtes pas autorisé à supprimer cet utilisateur."});
        return ;
      };
    })
  };//Else if I am owner or Admin, can delete
  User.findOne({where : { id: req.params.id}})
  .then(user => {
    if (user.imageUrl == null || user.imageUrl == "") {
      User.destroy({ where: { id: req.params.id } })
      .then(() => res.status(201).json({ message: "Utilisateur supprimé !"}))
    } else {
      const filename = user.imageUrl.split('/images/users/')[1];
      fs.unlink('images/users/' + filename, () => {
        User.destroy({ where: { id: req.params.id } })
        .then(() => res.status(201).json({ message: "Utilisateur supprimé !"}))
        // .catch(error => res.status(400).json({ error }));
      });
    }
  })
};