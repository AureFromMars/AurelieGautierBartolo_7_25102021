// Imports
const express = require('express');
const commentRouter = express.Router();
const commentCtrl = require('../controllers/comment');
const token = require('../middlewares/token');

// CRUD ENDPOINT = CREATE, READ, UPDATE, DELETE // Routes for comments

commentRouter.post('/create/', token, commentCtrl.createComment);
commentRouter.get('/allFromMessage/', token, commentCtrl.getAllCommentsFromMessage);
commentRouter.get('/one/:id', token, commentCtrl.getOneComment);
commentRouter.put('/modify/:id', token, commentCtrl.modifyComment);
commentRouter.delete('/delete/:id', token, commentCtrl.deleteComment);

// EXPORT router module
module.exports = commentRouter;