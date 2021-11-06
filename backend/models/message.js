'use strict';
const { Sequelize, Model, DataTypes } = require('sequelize');
const db = require('.');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      this.messageBelongsToUser = this.belongsTo(models.User, {
        onDelete: 'CASCADE',
        foreignKey: {
          name: 'userId',
          allowNull: false
        }
      });
      this.messageHasManyComments = this.hasMany(models.Comment, {
        onDelete: 'CASCADE',
        foreignKey: {
          name: 'messageId',
          allowNull: true
        }
      });
      this.messageHasManyLiking = this.hasMany(models.Liking, {
        onDelete: 'CASCADE',
        foreignKey: {
          name: 'messageId',
          allowNull: true
        }
      });
    }
  };
  Message.init(
    {
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
      }
    },
    {
    sequelize
    }
  );
  return Message;
};