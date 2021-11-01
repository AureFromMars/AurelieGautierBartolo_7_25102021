// Imports
const db = require('../models');
const Message = db.messages;// Message model
const fs = require('fs');// File system Node module to manager files
// const User = require('../models/user');// Authentification model// DELETE ????????????????????????????????????????????????????????????????????????????????

// CRUD Controllers = CREATE, READ, UPDATE, DELETE // Controllers for messages

exports.createMessage = (req, res, next) => {
  // const messageObject = JSON.parse(req.body.message);
  // delete messageObject._id;
  // const message = Message.create({
  Message.create({
    ...req.body// Shortcup to replace all fields in Message.js like title: req.body.title
    // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  })

  .then(() => res.status(201).json({ message: "Message enregistré !"}))// Callback that returns the promise
  .catch(error => res.status(400).json({ error }));// Callback error
};

exports.getAllMessages = (req, res, next) => {
  Message.findAll()
  .then((messages) => res.status(200).json(messages))// Callback that returns the promise
  .catch(error => res.status(400).json({ error }));// Callback error
};

exports.getOneMessage = (req, res, next) => {
  Message.findOne({attributes: ['id', 'title', 'content', 'like', 'userLiked'], where : { id: req.params.id }})
  .then((message) => res.status(200).json(message))// Callback that returns the promise
  .catch(error => res.status(404).json({ error }));// Callback error
};

exports.modifyMessage = (req, res, next) => {
	Message.findOne({where : { id: req.params.id}})
	.then(Message => {
		Message.update({...req.body})
		.then(() => res.status(201).json({ message: "Message modifié !"}))
		.catch(error => res.status(470).json({ error }));
	})
};

exports.deleteMessage = (req, res, next) => {
	Message.destroy({where : { id: req.params.id }})
	.then(() => res.status(201).json({ message: "Message supprimé !"}))
	.catch(error => res.status(410).json({ error }));
};