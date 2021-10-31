// Imports
const express = require('express');
const messageRouter = express.Router();
const messageCtrl = require('../controllers/message');

const session = {};// TO DEFINE ###########################################################

// CRUD ENDPOINT = CREATE, READ, UPDATE, DELETE // Routes for messages

// messageRouter.post('/create/', session, messageCtrl.createMessage);
// messageRouter.put('/modify/:id', session, messageCtrl.modifyMessage);
// messageRouter.delete('/delete/:id', session, messageCtrl.deleteMessage);
// messageRouter.get('/one/:id', messageCtrl.getOneMessage);
// messageRouter.get('/all/', messageCtrl.getAllMessages);
// messageRouter.post('/like/:id', session, messageCtrl.likingMessage);

// EXPORT router module
module.exports = messageRouter;