// Imports
const db = require('../models');
const User = db.User;// User model
const Message = db.Message;// Message model
const Liking = db.Liking;// Liking model
// const {User, Message, Liking, Liking} = require('../models');// Equals to lines above // J'ai pas réussi à l'intégrer en l'état !

exports.addLiking = (req, res, next) => {
  delete req.body.id;
  Liking.create({ ...req.body })
  .then(() => res.status(201).json({ message: "Like/Dislike enregistré !"}))// Callback that returns the promise
  // .catch(error => res.status(400).json({ error }));// Callback error
};

exports.getAllLiking = (req, res, next) => {
  Liking.findAll({
    include: [
      { model: User, attributes: ['id'] },
      { model: Message, attributes: ['id'] }
    ]
  })
  .then(() => res.status(201).json({ message: "Voici tous les Like/Dislike !"}))// Callback that returns the promise
  // .catch(error => res.status(400).json({ error }));// Callback error
};

exports.getOneLiking = (req, res, next) => {
  Liking.findOne({ 
    attributes: ['id', 'content'],// USEFULL ?????????????????????????????????????????????????? Voir User et Message du coup
    where : { id: req.params.id},
    include: [
      { model: Message, attributes: ['id'] },
      { model: Liking, attributes: ['id'] }
    ]
  })
  .then(() => res.status(201).json({ message: "Voici le Like/Dislike demandé !"}))// Callback that returns the promise
  // .catch(error => res.status(404).json({ error }));// Callback error
};

exports.modifyLiking = (req, res, next) => {
  if(req.token.userId !== req.params.id) {// If I am not owner then am I Admin ?
    User.findOne({attributes: ['id', 'isAdmin'], where : { id: req.token.userId}})
    .then((user) => {
      if (!user.isAdmin) {// If I am not Admin => go fuck
        res.status(401).json({ message: "Vous n'êtes pas autorisé à modifier ce Like/Dislike."});
        return ;
      };
    })
  };
	Liking.findOne({ where : { id: req.params.id} })
	.then(liking => {
		Liking.update(...req.body,{ where: { id: req.params.id } })
		.then(() => res.status(201).json({ message: "Like/Dislike modifié !"}))
		// .catch(error => res.status(470).json({ error }));
	})
};

exports.deleteLiking = (req, res, next) => {
  if(req.token.userId !== req.params.id) {// If I am not owner then am I Admin ?
    User.findOne({attributes: ['id', 'isAdmin'], where : { id: req.token.userId}})
    .then((user) => {
      if (!user.isAdmin) {// If I am not Admin => go fuck
        res.status(401).json({ message: "Vous n'êtes pas autorisé à modifier ce Like/Dislike."});
        return ;
      };
    })
  };
	Liking.findOne({ where : { id: req.params.id} })
  .then(liking => {
    Liking.destroy({where : { id: req.params.id }})// include ????????????????????????????????????????????????
    .then(() => res.status(201).json({ message: "Like/Dislike supprimé !"}))
    // .catch(error => res.status(410).json({ error }));    
  })
};