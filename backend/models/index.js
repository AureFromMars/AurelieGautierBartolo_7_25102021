'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV;
const dbConfig = require(__dirname + './../config/db.config')[env];

// DB instance Sequelize model
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USERNAME, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  // logging: false,// Unactivate logs to avoid lot of SQL queries registered
  operatorsAliases: 0,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  define: {
    freezeTableName: true// Force table name to be equal to model name// Can also be defined locally, on the specific model
  }
});

const db = {};

db.users = require("./user")(sequelize, Sequelize);
db.messages = require("./message")(sequelize, Sequelize);
db.comments = require("./comment")(sequelize, Sequelize);
db.liking = require("./liking")(sequelize, Sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// fs
//   .readdirSync(__dirname)// Allows to recuperer fichiers presents dans dossier models et recuperer les fichiers qui ne commencent pas par un point puis recup ceux hors index.js, puis prends tous les fichiers.js

//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {//Fait variable model, require le fichier du model et l'exécute
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;// Stocke dans l'objet db le model
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// Export
module.exports = db;