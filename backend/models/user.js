// const { Sequelize, Model, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('mysql::memory:');

// module.exports = (sequelize, Sequelize) => {

//   const User = sequelize.define('User', {
//     id: {
//       type: DataTypes.UUID,
//       defaultValue: Sequelize.UUIDV4,
//       allowNull: false,
//       unique: true,
//       primaryKey: true
//     },
//     email: {
//       type: DataTypes.TEXT,
//       unique: true,
//       allowNull: false
//     },
//     username: {
//       type: DataTypes.STRING,
//       unique: true,
//       allowNull: false
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     isAdmin: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
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
const { Sequelize, Model, DataTypes } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}// define association here ###
  };
  User.init(// require() then model.init() is an alternate of sequelize/import(path)
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
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
    {
    sequelize
    // modelName: 'User'
    }
  );
  return User;
};