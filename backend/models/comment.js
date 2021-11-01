'use strict';
const { Sequelize, Model, DataTypes } = require('sequelize');
const db = require('.');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      this.commentBelongsToMessage = this.belongsTo(models.Message);
      this.commentBelongsToUser = this.belongsTo(models.User);
    }
  };
  Comment.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true
      },
      // messageId: {// Foreign Key
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: db.messages,// This is a reference to another model 
      //     key: 'id'// This is the column name of the referenced model
      //   },
      //   comment: 'This is the foreign key from Message table'
      // },
      // userId: {// Foreign Key
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: db.users,// This is a reference to another model 
      //     key: 'id'// This is the column name of the referenced model
      //   },
      //   comment: 'This is the foreign key from User table'
      // },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
    sequelize
    // modelName: 'Messages'
    }
  );
  return Comment;
};