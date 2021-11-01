// Imports
const express = require('express');
const messageRouter = express.Router();
const messageCtrl = require('../controllers/message');

// CRUD ENDPOINT = CREATE, READ, UPDATE, DELETE // Routes for messages

messageRouter.post('/create/', messageCtrl.createMessage);
messageRouter.get('/all/', messageCtrl.getAllMessages);
messageRouter.get('/one/:id', messageCtrl.getOneMessage);
messageRouter.put('/modify/:id', messageCtrl.modifyMessage);
messageRouter.delete('/delete/:id', messageCtrl.deleteMessage);

// EXPORT router module
module.exports = messageRouter;