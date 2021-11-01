'use strict';
const { Sequelize, Model, DataTypes } = require('sequelize');
const db = require('.');
module.exports = (sequelize, DataTypes) => {
  // class Message extends Model {
  //   static associate(models) {
  //     this.messageBelongsToUser = this.belongsTo(models.User, {
  //       onDelete: "CASCADE",
  //       foreignKey: {
  //         allowNull: false
  //       }
  //     });
  //     this.messageHasManyComment = this.hasMany(models.Comment, {
  //       onDelete: "CASCADE",
  //       foreignKey: {
  //         allowNull: false
  //       }
  //     });
  //     this.messageHasManyLiking = this.hasMany(models.Liking, {
  //       onDelete: "CASCADE",
  //       foreignKey: {
  //         allowNull: false
  //       }
  //     });
  //   }
  // };
  class Message extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        onDelete: "CASCADE",
        foreignKey: {
          name: 'userId',
          allowNull: false
        }
      });
      this.hasMany(models.Comment, {
        onDelete: "CASCADE",
        foreignKey: {
          name: 'commentId',
          allowNull: true
        }
      });
      this.hasMany(models.Liking, {
        onDelete: "CASCADE",
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
      }
    },
    {
    sequelize
    // modelName: 'Messages'
    }
  );
  return Message;
};