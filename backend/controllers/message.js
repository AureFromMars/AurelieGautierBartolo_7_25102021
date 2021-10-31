// Imports
const Message = require('../models/message');
const fs = require('fs');// File system Node module to manager files
const User = require('../models/user');// Authentification model// DELETE ????????????????????????????????????????????????????????????????????????????????

// CRUD Controllers = CREATE, READ, UPDATE, DELETE // Controllers for messages

exports.createMessage = (req, res, next) => {
    const messageObject = JSON.parse(req.body.message);
    delete messageObject._id;
    const message = new Message({
        ...messageObject,// Shortcup to replace all fields in Message.js like title: req.body.title
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    message.save()// Save object in database
    .then(() => res.status(201).json({ message: "Message enregistré !"}))// Callback that returns the promise
    .catch(error => res.status(400).json({ error }));// Callback error
};

exports.getAllMessages = (req, res, next) => {
    Message.find()
    .then((messages) => res.status(200).json(messages))// Callback that returns the promise
    .catch(error => res.status(400).json({ error }));// Callback error
};

exports.getOneMessage = (req, res, next) => {
    Message.findOne({ _id: req.params.id })
    .then((message) => res.status(200).json(message))// Callback that returns the promise
    .catch(error => res.status(404).json({ error }));// Callback error
};

exports.modifyMessage = (req, res, next) => {
    if (res.locals.userId === req.params.userId) {// If same userId because rights allows to proprior
        const messageObject = req.file ? {
            ...JSON.parse(req.body.message),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };

        if (req.file) {
            Message.findOne({ _id: req.params.id})
            .then(message => {
                const filename = message.imageUrl.split('/images/')[1];
                fs.unlink('images/' + filename, () => {
                    Message.updateOne(// .save included in mongoose to persist datas
                        { _id: req.params.id },
                        { ...messageObject, _id: req.params.id, imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` }
                    )
                    .then(() => res.status(200).json({ message: "Message modifié !"}))
                    .catch(error => res.status(400).json({ error }));// Callback error
                    console.log("Image supprimée !")
                })
            })
            .catch(error => res.status(400).json({ error }));
        } else {
            Message.updateOne(// Use "await" to avoid double function with above
                { _id: req.params.id },
                { ...messageObject, _id: req.params.id }
            )
            .then(() => res.status(200).json({ message: "Message modifié !"}))
            .catch(error => res.status(400).json({ error }));// Callback error
        };
    } else {
        res.status(403).json({ error })
        .catch(error => res.status(400).json({ error }));// Callback error
    }
};

exports.likingMessage = (req, res, next) => {
    Message.findOne({ _id: req.params.id })
    .then (message => {
        const likingDatas = {
            usersLiked: message.usersLiked,
            usersDisliked: message.usersDisliked,
            likes: message.likes,
            dislikes: message.dislikes
        };
        switch (req.body.like) {
            case -1 :// Dislike case
                if (likingDatas.usersLiked.includes(req.body.userId)) {
                    const indexUsersLiked = likingDatas.usersLiked.indexOf(req.body.userId);
                    likingDatas.usersLiked.splice(indexUsersLiked, 1)
                };
                if (!likingDatas.usersDisliked.includes(req.body.userId)) {// To protect multiple dislike
                    likingDatas.usersDisliked.push(req.body.userId);
                };
                console.log("Dislike");
                break;
            case 1 :// Like case
                if (likingDatas.usersDisliked.includes(req.body.userId)) {
                    const indexUsersDisliked = likingDatas.usersDisliked.indexOf(req.body.userId);
                    likingDatas.usersDisliked.splice(indexUsersDisliked, 1);
                };
                if (!likingDatas.usersLiked.includes(req.body.userId)) {// To protect multiple dislike
                    likingDatas.usersLiked.push(req.body.userId);
                };
                console.log("Like");
                break;
            case 0 :// Set default value (0) like/dislike from user
                if (likingDatas.usersLiked.includes(req.body.userId)) {
                    const indexUsersLiked = likingDatas.usersLiked.indexOf(req.body.userId);
                    likingDatas.usersLiked.splice(indexUsersLiked, 1);
                } else if (likingDatas.usersDisliked.includes(req.body.userId)) {
                    const indexUsersDisliked = likingDatas.usersDisliked.indexOf(req.body.userId);
                    likingDatas.usersDisliked.splice(indexUsersDisliked, 1);
                };
                console.log(0);
            default :
                console.log("default");
        };
        // Get number of likes and dislikes
        likingDatas.likes = likingDatas.usersLiked.length;
        likingDatas.dislikes = likingDatas.usersDisliked.length;

        Message.updateOne({ _id: req.params.id }, likingDatas )
        .then(() => res.status(200).json({ message: "Like/Dislike ajouté/modifié !" }))
        .catch(error => res.status(403).json({ error }));
    })
    .catch(error => res.status(400).json({ error }));
};

exports.deleteMessage = (req, res, next) => {
    if (res.locals.userId === req.params.userId) {// If same userId because rights allows to proprior
        Message.findOne({ _id: req.params.id})
        .then(message => {
            const filename = message.imageUrl.split('/images/')[1];
            console.log("filename : " + filename);
            fs.unlink('images/' + filename, () => {
                Message.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: "Message supprimé !"}))// Callback that returns the promise
                .catch(error => res.status(400).json({ error }));// Callback error
            });
        })
        .catch(error => res.status(400).json({ error }));
    } else {
        res.status(403).json({ message: "Vous n\'avez pas les autorisations pour supprimer le message car vous devez en être le propriétaire !"})
        .catch(error => res.status(400).json({ error }));// Callback error
    }
};