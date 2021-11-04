// Imports
const express = require('express');
const likingRouter = express.Router();
const likingCtrl = require('../controllers/liking');
const token = require('../middleware/token');

// CRUD ENDPOINT = CREATE, READ, UPDATE, DELETE // Routes for liking

likingRouter.post('/add/', token, likingCtrl.addLiking);
likingRouter.get('/all/', token, likingCtrl.getAllLiking);
likingRouter.get('/one/:id', token, likingCtrl.getOneLiking);
likingRouter.put('/modify/:id', token, likingCtrl.modifyLiking);
likingRouter.delete('/delete/:id', token, likingCtrl.deleteLiking);

// EXPORT router module
module.exports = likingRouter;