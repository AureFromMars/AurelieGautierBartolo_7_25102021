// Imports
const express = require('express');
const likingRouter = express.Router();
const likingCtrl = require('../controllers/liking');
const token = require('../middlewares/token');

// CRUD ENDPOINT = CREATE, READ, UPDATE, DELETE // Routes for liking

likingRouter.post('/add', token, likingCtrl.addLiking);
likingRouter.get('/allFromUser/:userId', token, likingCtrl.getAllLikingFromUser);
likingRouter.get('/allFromMessage/:messageId', token, likingCtrl.getAllLikingFromMessage);
likingRouter.get('/one/:id', token, likingCtrl.getOneLiking);
likingRouter.put('/modify', token, likingCtrl.modifyLiking);
likingRouter.delete('/delete', token, likingCtrl.deleteLiking);

// EXPORT router module
module.exports = likingRouter;