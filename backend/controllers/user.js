// Imports
const db = require('../models');
const User = db.users;// User model
const bcrypt = require('bcrypt');// Bcrypt package and set salt to hash password
const saltRounds = 10;// Allows to complexify encrypt executing 10 times the hashing algorithm
const cryptoJs = require('crypto-js');// Crypto-js package to encrypt email
const jwt = require('jsonwebtoken');// jsonwebtoken package to create a token
const token = require('../middlewares/token');

// MANQUE UNIQUE VALIDATOR pour l'email ? Or not puisque défini dans le schema d'user.js
// Vérifier le username à l'inscription

// Register a new user in the DB ####################################################################### email must be unique... première réponse... puis username must be unique... HOW TO in the same time ?
exports.register = (req, res, next) => {
	bcrypt.hash(req.body.password, saltRounds)// Hash du password to encrypt with SHA 512 Bit... allows to compare 2 files that should be the same if not corrupted
	.then((hash) => {// Callback that returns the promise
		const user = User.create({// Either .built then .save || .create
			...req.body,
			password: hash
			// picture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`//###################### à vérifier avec client
		})
		.then(() => res.status(201).json({ message: "Utilisateur enregistré !"}))// Callback that returns the promise
		.catch(error => res.status(456).json({ error }));
	})
	.catch(error => res.status(489).json({ error }));
};

// Login authentification
exports.login = (req, res, next) => {
	// const decryptEmail = cryptoJs.HmacSHA256(req.body.email, process.env.EMAIL_ENCRYPT_KEY).toString();
	// User.findOne({ email: decryptEmail })// Check if users exists in DB
	User.findOne({email: req.body.email})
	.then(user => {
		if (!user) {
			return res.status(401).json({ error });// User not found
		};
		bcrypt.compare(req.body.password, user.password)// Check
		.then(valid => {
			if (!valid) {
				return res.status(401).json({ error });// Password failed // If...return, then no need to write else because stop the instruction
			} else {
				res.status(200).json({
					userId: user._id,
					token: jwt.sign(
						{ userId: user._id }, 'RANDOM_TOKEN_SECRET', { expiresIn: '2h' }
					),
					message: "Utilisateur connecté !"
				})
				.catch(error => res.status(400).json({ error }));
			};
		})
		.catch(error => res.status(500).json({ error }));
	})
	.catch(error => res.status(500).json({ error }));
};

exports.getAllUsers = (req, res, next) => {
	User.findAll()
	.then((messages) => res.status(200).json(messages))
	.catch(error => res.status(400).json({ error }));
};

exports.getOneUser = (req, res, next) => {
	User.findOne({where : { id: req.params.id}})
	.then((messages) => res.status(200).json(messages))
	.catch(error => res.status(400).json({ error }));
};

exports.modifyUser = (req, res, next) => {
	User.findOne({where : { id: req.params.id}})
	.then(User => {
		User.update({...req.body})
		.then(() => res.status(201).json({ message: "Utilisateur modifié !"}))
		.catch(error => res.status(470).json({ error }));
	})
};

exports.deleteUser = (req, res, next) => {
	User.destroy({where : { id: req.params.id }})
	.then(() => res.status(201).json({ message: "Utilisateur supprimé !"}))
	.catch(error => res.status(410).json({ error }));
};