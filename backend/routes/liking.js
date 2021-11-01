// Imports
const express = require('express');
const likingRouter = express.Router();
const likingCtrl = require('../controllers/liking');

// CRUD ENDPOINT = CREATE, READ, UPDATE, DELETE // Routes for likings

likingRouter.post('/add/', likingCtrl.addLiking);
likingRouter.get('/all/', likingCtrl.getAllLiking);
likingRouter.get('/one/:id', likingCtrl.getOneLiking);
likingRouter.put('/modify/:id', likingCtrl.modifyLiking);
likingRouter.delete('/delete/:id', likingCtrl.deleteLiking);

// EXPORT router module
module.exports = likingRouter;