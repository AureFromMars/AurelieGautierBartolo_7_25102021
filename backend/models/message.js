'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Messages extends Model {
    static associate(models) {
      // define association here ###########################################################
    }
  };
  Messages.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,// ???????????????????????????????????? Sequelize not reconized
        allowNull: false,
        unique: true,
        primaryKey: true
      },
      user_id: {// Foreign Key
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Users,// This is a reference to another model 
          key: 'id'// This is the column name of the referenced model
        },
        comment: 'This is the foreign key form Users table'
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
        type: DataTypes.STRING,
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      comments: {
        type: DataTypes.TEXT,
      },
      likes: {
        type: DataTypes.INTEGER,
        default: 0
      },
      dislikes: {
        type: DataTypes.INTEGER,
        default: 0
      },
      userLiked: {
        type: DataTypes.INTEGER,// +1 -1 0
        default: 0,
      }
    },
    {
    sequelize
    // modelName: 'Messages'
    }
  );
  return Messages;
};