// Imports
const {User, Message, Comment, Liking} = require('../models');


const fs = require('fs');// File system Node module to manager files

exports.createMessage = (req, res, next) => {
  if (req.file) {
    const messageObject = {
      ...JSON.parse(req.body.message),
      imageUrl: `${req.protocol}://${req.get('host')}/images/messages/${req.file.filename}`
    }
    .then((hash) => {
      delete messageObject.id;
      Message.create({// Either .built then .save || .create // .save doesn't store images
        ...messageObject,
      })
      .then(() => res.status(201).json({ message: "Message enregistré !"}))
    })
    // .catch(error => res.status(454).json({ error }));// Recode the number #################################################
  } else {
    delete req.body.id;
    Message.create({
      ...req.body,
    })
    .then(() => res.status(201).json({ message: "Message enregistré !"}))
    // .catch(error => res.status(456).json({ error }));// Recode the number #################################################
  }
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

// Récupérer message, puis l'utilisateur à l'intérieur



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