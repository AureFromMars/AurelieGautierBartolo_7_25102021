// Imports
const express = require('express');/// Import Express
const userRouter = express.Router();// Create a new router object of the middleware
const userCtrl = require('../controllers/user');
const userValidator = require('../middlewares/userValidator');
const token = require('../middlewares/token');

// CRUD ENDPOINT = CREATE, READ, UPDATE, DELETE // Routes for users
userRouter.post('/register', userValidator.email, userValidator.password, userValidator.username, userCtrl.register);
userRouter.post('/login', userCtrl.login);
userRouter.get('/all', userCtrl.getAllUsers);
userRouter.get('/one/:id', userCtrl.getOneUser);
// userRouter.put('/:id', token, userCtrl.modifyUser);
userRouter.put('/modify/:id', userCtrl.modifyUser);
userRouter.delete('/delete/:id', token, userCtrl.deleteUser);
// userRouter.post('/logout', userCtrl.logout);// CLIENT SIDE to expire token, stored as cookie !

// EXPORT app module
module.exports = userRouter;