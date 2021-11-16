// Imports
const express = require('express');
const messageRouter = express.Router();
const messageCtrl = require('../controllers/message');
const uploadImage = require('../middlewares/uploadMessageImage');
const token = require('../middlewares/token');

// CRUD ENDPOINT = CREATE, READ, UPDATE, DELETE // Routes for messages

messageRouter.post('/create', token, uploadImage.single('file'), messageCtrl.createMessage);
messageRouter.get('/all', token, messageCtrl.getAllMessages);
messageRouter.get('/allFromUser', token, messageCtrl.getAllMessagesFromUser);
messageRouter.get('/one/:id', token, messageCtrl.getOneMessage);
messageRouter.put('/modify/:id', token, uploadImage.single('file'), messageCtrl.modifyMessage);
messageRouter.delete('/delete/:id', token, messageCtrl.deleteMessage);

// EXPORT router module
module.exports = messageRouter;