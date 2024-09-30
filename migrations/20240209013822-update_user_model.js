"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn("Users", "phone", {
        type: Sequelize.BIGINT,
        allowNull: true,
        unique: true,
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([queryInterface.changeColumn("Users", "phone")]);
  },
};
