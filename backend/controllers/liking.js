// Imports
const db = require('../models');
const Liking = db.liking;// Liking model
const fs = require('fs');// File system Node module to manager files
// const User = require('../models/user');// Authentification model// DELETE ????????????????????????????????????????????????????????????????????????????????

// CRUD Controllers = CREATE, READ, UPDATE, DELETE // Controllers for liking

exports.addLiking = (req, res, next) => {
  // const messageObject = JSON.parse(req.body.message);
  // delete messageObject._id;
  // const message = Liking.create({
  Liking.create({
    ...req.body// Shortcup to replace all fields in Liking.js like title: req.body.title
    // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  })

  .then(() => res.status(201).json({ message: "Like/Dislike enregistré !"}))// Callback that returns the promise
  .catch(error => res.status(400).json({ error }));// Callback error
};

exports.getAllLiking = (req, res, next) => {
  Liking.findAll()
  .then((liking) => res.status(200).json(liking))// Callback that returns the promise
  .catch(error => res.status(400).json({ error }));// Callback error
};

exports.getOneLiking = (req, res, next) => {
  Liking.findOne({attributes: ['id', 'value'], where : { id: req.params.id }})
  .then((message) => res.status(200).json(message))// Callback that returns the promise
  .catch(error => res.status(404).json({ error }));// Callback error
};

exports.modifyLiking = (req, res, next) => {
	Liking.findOne({where : { id: req.params.id}})
	.then(Liking => {
		Liking.update({...req.body})
		.then(() => res.status(201).json({ message: "Like/Dislike modifié !"}))
		.catch(error => res.status(470).json({ error }));
	})
};

exports.deleteLiking = (req, res, next) => {
	Liking.destroy({where : { id: req.params.id }})
	.then(() => res.status(201).json({ message: "Like/Dislike supprimé !"}))
	.catch(error => res.status(410).json({ error }));
};