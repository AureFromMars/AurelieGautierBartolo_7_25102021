// Imports
const db = require('../models');
const User = db.users;// User model
const bcrypt = require('bcrypt');// Bcrypt package and set salt to hash password
const saltRounds = 10;// Allows to complexify encrypt executing 10 times the hashing algorithm
const cryptoJs = require('crypto-js');// Crypto-js package to encrypt email
const jwt = require('jsonwebtoken');// jsonwebtoken package to create a token


// MANQUE UNIQUE VALIDATOR pour l'email ? Or not puisque défini dans le schema d'user.js
// Vérifier le username à l'inscription


// Register a new user in the DB
exports.register = (req, res, next) => {
    // Encryption of the email
    // const encryptEmail = cryptoJs.HmacSHA256(req.body.email, process.env.EMAIL_ENCRYPT_KEY);
    // Hash du password to encrypt with SHA 512 Bit... allows to compare 2 files that should be the same if not corrupted
    bcrypt.hash(req.body.password, saltRounds)
    .then((hash) => {// Callback that returns the promise
        // console.log(encryptEmail);
        const user = User.create({// Either .built + .save || .create
					...req.body,
					password: hash
        })
        // user.save() // Return a promise
        .then(() => res.status(201).json({ message: "Utilisateur enregistré !"}))// Callback that returns the promise
        .catch(error => res.status(400).json({ error }));
        console.log(user instanceof User);
    })
    .catch(error => res.status(400).json({ error }));
};

// Login authentification
exports.login = (req, res, next) => {
    // const decryptEmail = cryptoJs.HmacSHA256(req.body.email, process.env.EMAIL_ENCRYPT_KEY).toString();
    // User.findOne({ email: decryptEmail })// Check if users exists in DB
    User.findone({where : {email: req.body.email}})
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
                // .catch(error => res.status(400).json({ error }));
            };
        })
        // .catch(error => res.status(500).json({ error }));
    })
    // .catch(error => res.status(500).json({ error }));
};

exports.logout = (req, res, next) => {

	req.session.destroy(function(error){ console.log("Session Destroyed") });

};


exports.getAllUsers = (req, res, next) => {

};

exports.getOneUser = (req, res, next) => {

};

exports.modifyUser = (req, res, next) => {

};

exports.deleteUser = (req, res, next) => {

};