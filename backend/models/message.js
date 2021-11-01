'use strict';
const { Sequelize, Model, DataTypes } = require('sequelize');
const db = require('.');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      // this.myAssociation = this.belongsTo(models.User);
    }
  };
  Message.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true
      },
      // userId: {// Foreign Key
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: db.users,// This is a reference to another model 
      //     key: 'id'// This is the column name of the referenced model
      //   },
      //   comment: 'This is the foreign key form User table'
      // },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      imgUrl: {
        type: DataTypes.STRING
      },
      // comments: {
      //   type: DataTypes.TEXT,
      // },
      liking: {
        type: DataTypes.INTEGER,
        default: 0
      },
      // dislikes: {
      //   type: DataTypes.INTEGER,
      //   default: 0
      // },
      userLiking: {
        type: DataTypes.INTEGER,// +1 -1 0
        default: 0,
      }
    },
    {
    sequelize
    // modelName: 'Messages'
    }
  );
  return Message;
};