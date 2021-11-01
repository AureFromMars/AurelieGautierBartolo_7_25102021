'use strict';
const { Sequelize, Model, DataTypes } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  // class User extends Model {
  //   static associate(models) {
  //     this.userHasManyMessage = this.hasMany(models.Message, {
  //       onDelete: "CASCADE",//The defaults for the One-To-One associations is SET NULL for ON DELETE and CASCADE for ON UPDATE.
  //       foreignKey: {
  //         allowNull: false
  //       }
  //     });
  //     this.userHasManyComment = this.hasMany(models.Comment, {
  //       onDelete: "CASCADE",
  //       foreignKey: {
  //         allowNull: false
  //       }
  //     });
  //     this.userHasManyLiking = this.hasMany(models.Liking, {
  //       onDelete: "CASCADE",
  //       foreignKey: {
  //         allowNull: false
  //       }
  //     });
  //   }
  // };
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Message, {
        onDelete: "CASCADE",//The defaults for the One-To-One associations is SET NULL for ON DELETE and CASCADE for ON UPDATE.
        foreignKey: {
          name: 'messageId',
          allowNull: true
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