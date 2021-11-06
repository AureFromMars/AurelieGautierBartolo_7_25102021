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
  .then(() => res.status(201).json({ message: "Commentaire enregistré !"}))// Callback that returns the promise
  // .catch(error => res.status(400).json({ error }));// Callback error
};

exports.getAllComments = (req, res, next) => {
  Comment.findAll({
    include: [
      { model: User, attributes: ['id'] },
      { model: Message, attributes: ['id'] }
    ]
  })
  then(() => res.status(201).json({ message: "Voici tous les commentaires !"}))// Callback that returns the promise
  // .catch(error => res.status(400).json({ error }));// Callback error
};

exports.getOneComment = (req, res, next) => {
  Comment.findOne({
    attributes: ['id', 'content'],// USEFULL ?????????????????????????????????????????????????? Voir User et Message du coup
    where : { id: req.params.id},
    include: [
      { model: Message, attributes: ['id'] },
      { model: Comment, attributes: ['id'] }
    ]
  })
  .then((message) => res.status(401).json({ message: "Voici le commentaire demandé !"}))// Callback that returns the promise
  // .catch(error => res.status(404).json({ error }));// Callback error
};

exports.modifyComment = (req, res, next) => {
  if(req.token.userId !== req.params.id) {// If I am not owner then am I Admin ?
    User.findOne({attributes: ['id', 'isAdmin'], where : { id: req.token.userId}})
    .then((user) => {
      if (!user.isAdmin) {// If I am not Admin => go fuck
        res.status(401).json({ message: "Vous n'êtes pas autorisé à modifier ce commentaire."});
        return ;
      };
    })
  };
	Comment.findOne({ where : { id: req.params.id} })
	.then(comment => {
		Comment.update(...req.body,{ where: { id: req.params.id } })
		.then(() => res.status(201).json({ message: "Commentaire modifié !"}))
		// .catch(error => res.status(470).json({ error }));
	})
};

exports.deleteComment = (req, res, next) => {
  if(req.token.userId !== req.params.id) {// If I am not owner then am I Admin ?
    User.findOne({attributes: ['id', 'isAdmin'], where : { id: req.token.userId}})
    .then((user) => {
      if (!user.isAdmin) {// If I am not Admin => go fuck
        res.status(401).json({ message: "Vous n'êtes pas autorisé à modifier ce commentaire."});
        return ;
      };
    })
  };
	Comment.findOne({ where : { id: req.params.id} })
  .then(comment => {
    Comment.destroy({where : { id: req.params.id }})// include ????????????????????????????????????????????????
    .then(() => res.status(201).json({ message: "Commentaire supprimé !"}))
    // .catch(error => res.status(410).json({ error }));    
  })
};