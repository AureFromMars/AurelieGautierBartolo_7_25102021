'use strict';
const { Sequelize, Model, DataTypes } = require('sequelize');
const db = require('.');
module.exports = (sequelize, DataTypes) => {
  class Liking extends Model {
    static associate(models) {
      this.likingBelongsToMessage = this.belongsTo(models.Message, {
        onDelete: 'CASCADE',
        foreignKey: {
          name: 'messageId',
          allowNull: false
        }
      });
      this.likingBelongsToUser = this.belongsTo(models.User, {
        onDelete: 'CASCADE',
        foreignKey: {
          name: 'userId',
          allowNull: false
        }
      });
    }
  };
  Liking.init(
    {
      value: {
        type: DataTypes.INTEGER,
        allowNull: false,
        default:0
      }
    },
    {
    sequelize
    }
  );
  return Liking;
};