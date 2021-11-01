// Imports
const db = require('../models');
const Comment = db.comments;// Comment model
const fs = require('fs');// File system Node module to manager files
// const User = require('../models/user');// Authentification model// DELETE ????????????????????????????????????????????????????????????????????????????????

// CRUD Controllers = CREATE, READ, UPDATE, DELETE // Controllers for comments

exports.createComment = (req, res, next) => {
  // const messageObject = JSON.parse(req.body.message);
  // delete messageObject._id;
  // const message = Comment.create({
  Comment.create({
    ...req.body// Shortcup to replace all fields in Comment.js like title: req.body.title
    // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  })

  .then(() => res.status(201).json({ message: "Commentaire enregistré !"}))// Callback that returns the promise
  .catch(error => res.status(400).json({ error }));// Callback error
};

exports.getAllComments = (req, res, next) => {
  Comment.findAll()
  .then((comments) => res.status(200).json(comments))// Callback that returns the promise
  .catch(error => res.status(400).json({ error }));// Callback error
};

exports.getOneComment = (req, res, next) => {
  Comment.findOne({attributes: ['id', 'content'], where : { id: req.params.id }})
  .then((message) => res.status(200).json(message))// Callback that returns the promise
  .catch(error => res.status(404).json({ error }));// Callback error
};

exports.modifyComment = (req, res, next) => {
	Comment.findOne({where : { id: req.params.id}})
	.then(Comment => {
		Comment.update({...req.body})
		.then(() => res.status(201).json({ message: "Commentaire modifié !"}))
		.catch(error => res.status(470).json({ error }));
	})
};

exports.deleteComment = (req, res, next) => {
	Comment.destroy({where : { id: req.params.id }})
	.then(() => res.status(201).json({ message: "Commentaire supprimé !"}))
	.catch(error => res.status(410).json({ error }));
};