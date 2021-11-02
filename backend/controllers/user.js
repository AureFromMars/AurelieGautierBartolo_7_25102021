// Imports
const db = require('../models');
const User = db.User;// User model
const Message = db.Message;// User model
const Comment = db.Comment;// User model
const Liking = db.Liking;// User model
// const {User, Message, Comment, Liking} = require('../models');// Equals to lines above

const bcrypt = require('bcrypt');// Bcrypt package and set salt to hash password
const saltRounds = 10;// Allows to complexify encrypt executing 10 times the hashing algorithm
const cryptoJs = require('crypto-js');// Crypto-js package to encrypt than decrypt email
const jwt = require('jsonwebtoken');// jsonwebtoken package to create a token
const token = require('../middleware/token');// SUPP ############################################################################?????????????????????????????????????????????????????

exports.register = (req, res, next) => {// For further cases IRL : create a specific route to uploads images because multer allows to upload even if User ins't valid
	const encryptEmail = cryptoJs.HmacSHA256(req.body.email, process.env.EMAIL_ENCRYPT_KEY).toString();// Encryption that can be further decrypted
    if (req.file) {
      const userObject = {
        ...JSON.parse(req.body.user),
        imageUrl: `${req.protocol}://${req.get('host')}/images/users/${req.file.filename}`
      }
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
		if (!user) {
			res.status(401).json({ message: "User not found !" });
      return;// User not found
		};
		bcrypt.compare(req.body.password, user.password)// Check
		.then(valid => {
			if (!valid) {
				res.status(401).json({ message: "Password failed !" });
        return;// Password failed // If...return, then no need to write else because stop the instruction
			} else {
				res.status(200).json({
					userId: user.id,
					token: jwt.sign(
						{ userId: user.id }, 'RANDOM_TOKEN_SECRET', { expiresIn: '2h' }// VARIABLE D'ENV ###########################
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
	User.findAll({
    // include: [
    //   {
    //     model: Message,
    //     attributes: ['id'],
    //     include: [
    //       { model: Comment, attributes: ['id'] },
    //       { model: Liking, attributes: ['id'] }
    //     ]
    //   }
    // ],
    include: [
      { model: Message, attributes: ['id'] },
      { model: Comment, attributes: ['id'] },
      { model: Liking, attributes: ['id'] }
    ]
  })
	.then((messages) => res.status(200).json(messages))
	.catch(error => res.status(400).json({ error }));
};

exports.getOneUser = (req, res, next) => {
	User.findOne({where : { id: req.params.id},
    include: [
      { model: Message, attributes: ['id'] },
      { model: Comment, attributes: ['id'] },
      { model: Liking, attributes: ['id'] }
    ]
  })
	.then((messages) => res.status(200).json(messages))
	.catch(error => res.status(400).json({ error }));
};

// exports.modifyUser = (req, res, next) => {
// 	User.findOne({where : { id: req.params.id}})
// 	.then(User => {
// 		User.update({...req.body})
// 		.then(() => res.status(201).json({ message: "Utilisateur modifié !"}))
// 		.catch(error => res.status(470).json({ error }));
// 	})
// };

exports.modifyUser = (req, res, next) => {
  User.findOne({attributes: ['id', 'isAdmin'], where : { id: req.token.userId}, include: [Message, Comment, Liking]})
  .then((user) => {
    if (user.isAdmin || (user.id === req.params.userId)) {// If same userId because rights allows to proprior
      const userObject = req.file ? {
        ...JSON.parse(req.body.user),
        imageUrl: `${req.protocol}://${req.get('host')}/images/users/${req.file.filename}`
      } : { ...req.body };
      if (req.file) {
        User.findOne({where : { id: req.params.id}})
        .then(user => {
          const filename = user.imageUrl.split('/images/users/')[1];
          fs.unlink('images/' + filename, () => {
            User.update(userObject, { where: {
              id: req.params.id,
              imageUrl: `${req.protocol}://${req.get('host')}/images/users/${req.file.filename}`
            }})
            .then(() => res.status(200).json({ message: "Utilisateur modifié !"}))
            // .catch(error => res.status(400).json({ error }));
          });
        })
        .catch(error => res.status(400).json({ error }));
      } else {
        User.update(userObject, { where: { id: req.params.id }})
        .then(() => res.status(200).json({ message: "Utilisateur modifié !"}))
        .catch(error => res.status(400).json({ error }));
      };
    } else {
      res.status(403).json({ error })
      .catch(error => res.status(400).json({ error }));
    };
  })
  // .catch(error => res.status(512).json({ error }));
};

exports.deleteUser = (req, res, next) => {
  User.findOne({attributes: ['id', 'isAdmin'], where : { id: req.token.userId}})
  .then((user) => {
    if (user.isAdmin || (user.id === req.params.userId)) {// If Admin or same userId because rights allows to proprior
      if (user.isAdmin || (user.id === req.params.userId)) {// If same userId because rights allows to proprior
        const userObject = req.file ? {
          ...JSON.parse(req.body.user),
          imageUrl: `${req.protocol}://${req.get('host')}/images/users/${req.file.filename}`
        } : { ...req.body };
        if (req.file) {
          User.findOne({where : { id: req.params.id}})
          .then(user => {
            const filename = user.imageUrl.split('/images/users/')[1];
            fs.unlink('images/users/' + filename, () => {
              User.destroy(userObject, {
                where: { id: req.params.id, imageUrl: `${req.protocol}://${req.get('host')}/images/users/${req.file.filename}` },
                include: [Message, Comment, Liking]// INCLUDE at least Liking ????????????????????????????????????????
              })
              .then(() => res.status(201).json({ message: "Utilisateur supprimé !"}))
              // .catch(error => res.status(400).json({ error }));
            });
          })
          // .catch(error => res.status(400).json({ error }));
        } else {
          User.destroy(userObject, {
            where: { id: req.params.id },
            include: [Message, Comment, Liking]// INCLUDE at least Liking ????????????????????????????????????????
          })
          .then(() => res.status(200).json({ message: "Utilisateur supprimé !"}))
          // .catch(error => res.status(400).json({ error }));
        };
      }
    } else {
      res.status(403).json({ error })
      // .catch(error => res.status(400).json({ error }));
    };
  })
  // .catch(error => res.status(512).json({ error }));
};