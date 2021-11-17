// Imports
const db = require('../models');
const User = db.User;// User model
const Message = db.Message;// Message model
const Comment = db.Comment;// Comment model
// const {User, Message, Comment, Liking} = require('../models');// Equals to lines above // J'ai pas réussi à l'intégrer en l'état !

exports.createComment = (req, res, next) => {
  delete req.body.id;
  Comment.create({
    ...req.body,
    userId: req.token.userId
  })
  .then(() => res.status(201).json({ message: "Commentaire enregistré !"}))
  .catch(error => res.status(400).json({ error }));
};

exports.getAllCommentsFromMessage = (req, res, next) => {
  Comment.findAll({
    where: {messageId: req.params.messageId},
    include: [
      { model: User},
      { model: Message}
    ]
  })
  .then((messages) => res.status(200).json(messages))
  .catch(error => res.status(400).json({ error }));
};

exports.getOneComment = (req, res, next) => {
  Comment.findOne({
    where : { id: req.params.id},
    include: [
      { model: User},
      { model: Message}
    ]
  })
  .then((messages) => res.status(200).json(messages))
  .catch(error => res.status(404).json({ error }));
};

exports.modifyComment = (req, res, next) => {
  if(req.token.userId !== req.body.userId) {// If I am not owner then am I Admin ?
    User.findOne({attributes: ['id', 'isAdmin'], where : { id: req.token.userId}})
    .then((user) => {
      if (!user.isAdmin) {// If I am not Admin => no access
        res.status(403).json({ message: "Vous n'êtes pas autorisé à modifier ce commentaire."});
        return ;
      };
    })
  };
	Comment.findOne({ where : { id: req.body.id} })
	.then(() => {
		Comment.update(req.body,{ where: { id: req.body.id } })
		.then(() => res.status(201).json({ message: "Commentaire modifié !"}))
		.catch(error => res.status(470).json({ error }));
	})
};

exports.deleteComment = (req, res, next) => {
  if(req.token.userId !== req.body.userId) {// If I am not owner then am I Admin ?
    User.findOne({attributes: ['id', 'isAdmin'], where : { id: req.token.userId}})
    .then((user) => {
      if (!user.isAdmin) {// If I am not Admin => no access
        res.status(401).json({ message: "Vous n'êtes pas autorisé à modifier ce commentaire."});
        return ;
      };
    })
  };
	Comment.findOne({ where : { id: req.body.id} })
  .then(() => {
    Comment.destroy({where : { id: req.body.id }})
    .then(() => res.status(201).json({ message: "Commentaire supprimé !"}))
    .catch(error => res.status(410).json({ error }));
  })
};