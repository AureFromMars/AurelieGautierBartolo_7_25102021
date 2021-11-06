// Imports
const db = require('../models');
const User = db.User;// User model
const Message = db.Message;// Message model
const Liking = db.Liking;// Liking model
// const {User, Message, Liking, Liking} = require('../models');// Equals to lines above // J'ai pas réussi à l'intégrer en l'état !

exports.addLiking = (req, res, next) => {
  delete req.body.id;
  if (req.body.value != -1 && req.body.value != 0 && req.body.value != 1) {
    res.status(401).json({ message: "Les seules valeurs acceptées sont : -1, 0 et 1 !"});
    return ;
  };
  Liking.create({
    ...req.body,
    userId: req.token.userId
  })
  .then(() => res.status(201).json({ message: "Like/Dislike enregistré !"}))
  .catch(error => res.status(400).json({ error }));
};

exports.getAllLikingFromUser = (req, res, next) => {
  Liking.findAll({
    where: {userId: req.body.userId},
    include: [
      { model: User},
      { model: Message}
    ]
  })
  .then((messages) => res.status(200).json(messages))
  .catch(error => res.status(444).json({ error }));
};

exports.getOneLiking = (req, res, next) => {
  Liking.findOne({ 
    where : { id: req.params.id},
    include: [
      { model: User},
      { model: Message}
    ]
  })
  .then(() => res.status(201).json({ message: "Voici le Like/Dislike demandé !"}))
  .catch(error => res.status(404).json({ error }));
};

exports.modifyLiking = (req, res, next) => {
  if(req.token.userId !== req.params.id) {// If I am not owner then am I Admin ?
    User.findOne({attributes: ['id', 'isAdmin'], where : { id: req.token.userId}})
    .then((user) => {
      if (!user.isAdmin) {// If I am not Admin => no access
        res.status(401).json({ message: "Vous n'êtes pas autorisé à modifier ce Like/Dislike."});
        return ;
      };
    })
  };
	Liking.findOne({ where : { id: req.params.id} })
	.then(liking => {
		Liking.update(req.body,{ where: { id: req.params.id } })
		.then(() => res.status(201).json({ message: "Like/Dislike modifié !"}))
		.catch(error => res.status(470).json({ error }));
	})
};

exports.deleteLiking = (req, res, next) => {
  if(req.token.userId !== req.params.id) {// If I am not owner then am I Admin ?
    User.findOne({attributes: ['id', 'isAdmin'], where : { id: req.token.userId}})
    .then((user) => {
      if (!user.isAdmin) {// If I am not Admin => no access
        res.status(401).json({ message: "Vous n'êtes pas autorisé à modifier ce Like/Dislike."});
        return ;
      };
    })
  };
	Liking.findOne({ where : { id: req.params.id} })
  .then(() => {
    Liking.destroy({where : { id: req.params.id }})
    .then(() => res.status(201).json({ message: "Like/Dislike supprimé !"}))
    .catch(error => res.status(410).json({ error }));    
  })
};