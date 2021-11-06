'use strict';
const { Sequelize, Model, DataTypes } = require('sequelize');
const db = require('.');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      this.commentBelongsToUser = this.belongsTo(models.Message, {
        onDelete: 'CASCADE',
        foreignKey: {
          name: 'messageId',
          allowNull: false
        }
      });
      this.commentBelongsToUser = this.belongsTo(models.User, {
        onDelete: 'CASCADE',
        foreignKey: {
          name: 'userId',
          allowNull: false
        }
      });
    }
  };
  Comment.init(
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
    sequelize
    }
  );
  return Comment;
};