// Imports
const db = require('../models');
const User = db.User;// User model
const Message = db.Message;// Message model
const Comment = db.Comment;// Comment model
const Liking = db.Liking;// Liking model
// const {User, Message, Comment, Liking} = require('../models');// Equals to lines above // J'ai pas réussi à l'intégrer en l'état !
const fs = require('fs');// File system Node module to manager files

// exports.createMessage = (req, res, next) => {
//   if (req.file) {
//     const messageObject = {
//       ...JSON.parse(req.body.message),
//       imageUrl: `${req.protocol}://${req.get('host')}/images/messages/${req.file.filename}`
//     }
//     .then(() => {// CHANGER HASH ############################################################################
//       delete messageObject.id;
//       Message.create({// Either .built then .save || .create // .save doesn't store images
//         ...messageObject
//       })
//       .then(() => res.status(201).json({ message: "Message enregistré !"}))
//     })
//     // .catch(error => res.status(454).json({ error }));// Recode the number #################################################
//   } else {
//     delete req.body.id;
//     Message.create({ ...req.body })
//     .then(() => res.status(201).json({ message: "Message enregistré !"}))
//     // .catch(error => res.status(456).json({ error }));// Recode the number #################################################
//   }
// };

exports.createMessage = (req, res, next) => {
  User.findOne({attributes: ['id'], where : { id: req.token.userId}})// Check if users exists in DB
	.then(user => {
    if (!user) {// If not Admin => no access
      res.status(401).json({ message: "User not found !" });
      return;
    };
  });
  if (req.file) {
    const messageObject = {
      ...JSON.parse(req.body.message),
      userId: req.token.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/messages/${req.file.filename}`
    }
    .then(() => {
      delete messageObject.id;
      Message.create({// Either .built then .save || .create // .save doesn't store images
        ...messageObject
      })
      .then(() => res.status(201).json({ message: "Message enregistré !"}))
    })
    // .catch(error => res.status(454).json({ error }));// Recode the number #################################################
  } else {
    delete req.body.id;
    Message.create({
      ...req.body,
      userId: req.token.userId,
    })
    .then(() => res.status(201).json({ message: "Message enregistré !"}))// Revoir si je laisse les données de la requête ou le message perso ############################################
    // .catch(error => res.status(456).json({ error }));// Recode the number #################################################
  }
};

exports.getAllMessages = (req, res, next) => {
  Message.findAll({
    include: [
      { model: User},
      { model: Comment},
      { model: Liking}
    ]
  })
  .then((messages) => res.status(200).json(messages))// Callback that returns the promise
  .catch(error => res.status(400).json({ error }));// Callback error
};

exports.getAllMessagesFromUser = (req, res, next) => {
  Message.findAll({
    where: {userId: req.token.userId},
    include: [
      { model: User},
      { model: Comment},
      { model: Liking}
    ]
  })
  .then((messages) => res.status(200).json(messages))// Callback that returns the promise
  .catch(error => res.status(400).json({ error }));// Callback error
};

exports.getOneMessage = (req, res, next) => {
  // Message.findOne({attributes: ['id', 'title', 'content', 'like', 'userLiked'], where : { id: req.params.id }})
  Message.findOne({
    where : { id: req.params.id },
    include: [
      { model: User},
      { model: Comment},
      { model: Liking}
    ]
  })
  .then((messages) => res.status(200).json(messages))// Callback that returns the promise
  .catch(error => res.status(404).json({ error }));// Callback error
};

exports.modifyMessage = (req, res, next) => {
  if(req.token.userId !== req.params.id) {// If I am not owner then am I Admin ?
    User.findOne({attributes: ['id', 'isAdmin'], where : { id: req.token.userId}})
    .then((user) => {
      if (!user.isAdmin) {// If not Admin => no access
        res.status(401).json({ message: "Vous n'êtes pas autorisé à modifier ce message."});
        return ;
      };
    })
  };
  Message.findOne({where : { id: req.params.id}})
  .then(message => {
    if (req.file) {
      const messageObject = req.file ? {
        ...JSON.parse(req.body.message),
        imageUrl: `${req.protocol}://${req.get('host')}/images/messages/${req.file.filename}`
      } : { ...req.body };
      if (message.imageUrl == null || message.imageUrl == "") {
        Message.update(messageObject,{ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: "Message modifié !"}))
        // .catch(error => res.status(400).json({ error }));
      } else {
        const filename = message.imageUrl.split('/images/messages/')[1];
        fs.unlink('images/messages/' + filename, () => {
          Message.update(messageObject,{ where: { id: req.params.id } })
          .then(() => res.status(200).json({ message: "Message modifié !"}))
          // .catch(error => res.status(400).json({ error }));
        });
      }
    } else {
      Message.update(...req.body,{ where: { id: req.params.id } })
      .then(() => res.status(200).json({ message: "Message modifié !"}))
      // .catch(error => res.status(400).json({ error }));
    };
  })
};

exports.deleteMessage = (req, res, next) => {
  if(req.token.userId !== req.params.id) {// If I am not owner then am I Admin ?
    User.findOne({attributes: ['id', 'isAdmin'], where : { id: req.token.userId}})
    .then((user) => {
      if (!user.isAdmin) {// If not Admin => no access
        res.status(401).json({ message: "Vous n'êtes pas autorisé à supprimer ce message."});
        return ;
      };
    })
  };// Else if I am owner or Admin, can delete
  Message.findOne({where : { id: req.params.id}})
  .then(message => {
    if (message.imageUrl == null || message.imageUrl == "") {
      Message.destroy({
        where: { id: req.params.id },
        include: [
          { model: User},// ????????????????????????????????????????
          { model: Comment},
          { model: Liking}
        ]
      })
      .then(() => res.status(201).json({ message: "Utilisateur supprimé !"}))
    } else {
      const filename = message.imageUrl.split('/images/messages/')[1];
      fs.unlink('images/messages/' + filename, () => {
        Message.destroy({
          where: { id: req.params.id },
          include: [
            { model: User},// ?????????????????????????????????????
            { model: Comment},
            { model: Liking}
          ]
        })
        .then(() => res.status(201).json({ message: "Utilisateur supprimé !"}))
        // .catch(error => res.status(400).json({ error }));
      });
    }
  })
};