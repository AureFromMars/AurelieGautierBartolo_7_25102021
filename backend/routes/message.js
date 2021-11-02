// Imports
const express = require('express');
const messageRouter = express.Router();
const messageCtrl = require('../controllers/message');
const uploadImage = require('../middleware/uploadMessageImage');
const token = require('../middleware/token');

// CRUD ENDPOINT = CREATE, READ, UPDATE, DELETE // Routes for messages

messageRouter.post('/create/', token, uploadImage.single('file'), messageCtrl.createMessage);
messageRouter.get('/all/', token, messageCtrl.getAllMessages);
messageRouter.get('/one/:id', token, messageCtrl.getOneMessage);
messageRouter.put('/modify/:id', token, uploadImage.single('file'), messageCtrl.modifyMessage);
messageRouter.delete('/delete/:id', token, messageCtrl.deleteMessage);

// EXPORT router module
module.exports = messageRouter;