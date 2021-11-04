// Imports
const express = require('express');/// Import Express
const userRouter = express.Router();// Create a new router object of the middleware
const userCtrl = require('../controllers/user');
const userValidator = require('../middleware/userValidator');
const token = require('../middleware/token');
const uploadImage = require('../middleware/uploadUserImage');

// CRUD ENDPOINT = CREATE, READ, UPDATE, DELETE // Routes for users
userRouter.post('/register', uploadImage.single('file'), userValidator.emailValidator, userValidator.passwordValidator, userValidator.usernameValidator, userCtrl.register);
userRouter.post('/login', userCtrl.login);
userRouter.get('/all', token, userCtrl.getAllUsers);
userRouter.get('/one/:id', token, userCtrl.getOneUser);
userRouter.put('/modify/:id', token, uploadImage.single('file'), userCtrl.modifyUser);
userRouter.delete('/delete/:id', token, userCtrl.deleteUser);

// EXPORT app module
module.exports = userRouter;