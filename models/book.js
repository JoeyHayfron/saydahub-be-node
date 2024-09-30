"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.User.hasMany(models.Book, {
        foreignKey: "author",
      });
      models.Book.belongsTo(models.User);
    }
  }

  Book.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      year: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      pages: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      edition: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      ISBN: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      overview: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      price: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      currency: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      language: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      categories: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      publisher: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      cover_image: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      main_book: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      sample_book: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Book",
    }
  );
  return Book;
};
