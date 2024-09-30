"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Books", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      year: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      pages: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      edition: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      ISBN: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      overview: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      currency: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      language: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      categories: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      publisher: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      cover_image: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      main_book: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      sample_book: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Books");
  },
};
