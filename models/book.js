'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Book.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Title cannot be left blank"
        }
      }
    },
    author: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Author cannot be left blank"
        }
      }
    },
    genre: DataTypes.STRING,
    year: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        is: {
          args: [/^[0-9]{0,4}$/],
          msg: "Year is optional but cannot contain non-numeric characters or exceed 4 digits in length"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};