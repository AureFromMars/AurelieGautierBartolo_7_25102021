// Imports
const express = require('express');/// Import Express
const userRouter = express.Router();// Create a new router object of the middleware
const userCtrl = require('../controllers/user');
const userValidator = require('../middlewares/userValidator');

const session = {};// TO DEFINE ###########################################################

// CRUD ENDPOINT = CREATE, READ, UPDATE, DELETE // Routes for users

userRouter.post('/register', userValidator.email, userValidator.password, userValidator.username, userCtrl.register);
userRouter.post('/login', userCtrl.login);
// userRouter.get('/all', userCtrl.getAllUsers);
// userRouter.get('/one/:id', userCtrl.getOneUser);
// userRouter.put('/modify/:id', session, userCtrl.modifyUser);
// userRouter.delete('/delete/:id', session, userCtrl.deleteUser);
// userRouter.post('/logout', userCtrl.logout);

// EXPORT app module
module.exports = userRouter;