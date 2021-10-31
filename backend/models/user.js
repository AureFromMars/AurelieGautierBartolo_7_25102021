// const { Sequelize, Model, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('mysql::memory:');

// module.exports = (sequelize, Sequelize) => {

//   const User = sequelize.define('users', {
//     id: {
//       type: DataTypes.UUID,
//       defaultValue: Sequelize.UUIDV4,
//       allowNull: false,
//       unique: true,
//       primaryKey: true
//     },
//     email: {
//       type: DataTypes.TEXT,
//       allowNull: false
//     },
//     username: {
//       type: DataTypes.STRING,
//       // allowNull: false
//     },
//     password: {
//       type: DataTypes.STRING,
//       // allowNull: false
//     },
//     isAdmin: {
//       type: DataTypes.BOOLEAN,
//       // allowNull: false
//       default: false
//     },
//     picture: {
//       type: DataTypes.STRING
//     },
//     bio: {
//       type: DataTypes.TEXT,
//     }
//   });
//   return User;
// };


'use strict';
// const { Model } = require('sequelize');
const { Sequelize, Model, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('mysql::memory:');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here ###########################################################
    }
  };
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true
      },
      email: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: false,
        validate: {
          isUnique: function (value, next) {
            const self = this;
            User.find({where: {email: value}})
            .then(function (user) {
              // reject if a different user wants to use the same email
              if (user && self.id !== user.id) {
                return next('Email already in use!');
              }
              return next();
            })
            .catch(function (err) { return next(err);
            });
          }
        }
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: false
      },
      picture: {
        type: DataTypes.STRING
      },
      bio: {
        type: DataTypes.TEXT,
      }
    },
    // { indexes:
    //   [{
    //   unique: true,
    //   fields: ['email']
    //   }]
    // },
    {
    sequelize
    // modelName: 'User'
    }
  );
  return User;
};