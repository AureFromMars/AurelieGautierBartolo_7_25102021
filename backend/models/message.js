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
          name: 'commentId',
          allowNull: true
        }
      });
      this.messageHasManyLiking = this.hasMany(models.Liking, {
        onDelete: 'CASCADE',
        foreignKey: {
          name: 'likingId',
          allowNull: true
        }
      });
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