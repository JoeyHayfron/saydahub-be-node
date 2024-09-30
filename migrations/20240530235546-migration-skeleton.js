"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          "Users",
          "author_status",
          {
            type: Sequelize.DataTypes.STRING,
            defaultValue: "not applied",
          },
          { transaction: t }
        ),
        queryInterface.removeColumn("Users", "become_author_pending_approval", {
          transaction: t,
        }),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumnColumn(
          "Users",
          "author_status",
          {
            type: Sequelize.DataTypes.STRING,
            defaultValue: "not applied",
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          "Users",
          "become_author_pending_approval",
          {
            type: Sequelize.DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
          },
          {
            transaction: t,
          }
        ),
      ]);
    });
  },
};
