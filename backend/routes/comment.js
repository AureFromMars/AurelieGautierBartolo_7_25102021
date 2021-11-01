// Imports
const express = require('express');
const commentRouter = express.Router();
const commentCtrl = require('../controllers/comment');

// CRUD ENDPOINT = CREATE, READ, UPDATE, DELETE // Routes for comments

commentRouter.post('/create/', commentCtrl.createComment);
commentRouter.get('/all/', commentCtrl.getAllComments);
commentRouter.get('/one/:id', commentCtrl.getOneComment);
commentRouter.put('/modify/:id', commentCtrl.modifyComment);
commentRouter.delete('/delete/:id', commentCtrl.deleteComment);

// EXPORT router module
module.exports = commentRouter;