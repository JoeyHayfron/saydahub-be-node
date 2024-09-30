"use strict";
const { Model } = require("sequelize");
const { AUTHOR_STATUS, USER_TYPES } = require("../helpers/constants");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      phone: { type: DataTypes.BIGINT, allowNull: true, unique: true },
      provider: { type: DataTypes.STRING, allowNull: false },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cover_photo: { type: DataTypes.STRING, allowNull: true },
      banner: { type: DataTypes.STRING, allowNull: true },
      user_type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: USER_TYPES.USER,
      },
      bio: { type: DataTypes.STRING, allowNull: true },
      website: { type: DataTypes.STRING, allowNull: true },
      number_of_followers: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      number_of_following: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      number_of_scoops: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      number_of_books: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      is_followed_by_me: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      author_status: {
        type: DataTypes.STRING,
        defaultValue: AUTHOR_STATUS.NOT_APPLIED,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
