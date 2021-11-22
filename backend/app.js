// Imports
const express = require('express');// Express framework that allows to build web apps with Node.js
const Sequelize = require('sequelize');
const morgan = require('morgan');// Morgan to have logs about HTTP middleware requests
const userRouter = require('./routes/user');// Registration route
const messageRouter = require('./routes/message');// Registration route
const commentRouter = require('./routes/comment');// Registration route
const likingRouter = require('./routes/liking');// Registration route
const path = require('path');// Path Node module to have path from images
const cors = require('cors');// Cors to avoid declare headers
const mysql = require('mysql2');// get the client

/*** Use middlewares and apps config */
const app = express();// bodyParser included since Express 4.16.0 and called with further : "app.use(express"

/*************** DB ***************/
const db = require("./models");
// Above to activate to resync DB
// db.sequelize.sync({alter: true, force: true}).then(() => {
//   console.log("Drop and re-sync db.");
// });

app.use(morgan('dev'));
app.use(cors());
app.options('*', cors());

app.use(express.json());// parse application/json
app.use(express.urlencoded({ extended: true }));// parse requests of content-type - application/x-www-form-urlencoded

// Allows to get the images folder from frontend
app.use('/images', express.static(process.cwd() + '/images'))

/*************** Set simple routes ***************/
app.use('/api/user', userRouter);// Create authentification route
app.use('/api/message', messageRouter);// Create authentification route
app.use('/api/message/comment', commentRouter);// Create authentification route
app.use('/api/message/liking', likingRouter);// Create authentification route

// EXPORT app module
module.exports = app;