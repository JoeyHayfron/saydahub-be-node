"use strict";
const { faker } = require("@faker-js/faker");

let dummyUsers = [];

for (var i = 3; i < 103; i++) {
  dummyUsers.push({
    id: i,
    name: faker.internet.userName(),
    email: faker.internet.email(),
    phone: `${i}555992684`,
    provider: "email",
    password: "$2b$10$fkBqfltp8p.nSmqwaB7J0ukDJ7LQ2nwPYdPCYGU2YZZzno1UpW5kW",
    cover_photo: null,
    banner: null,
    user_type: i % 2 == 0 ? "user" : "author",
    bio: null,
    website: null,
    number_of_followers: 0,
    number_of_following: 0,
    number_of_scoops: 0,
    number_of_books: 0,
    is_followed_by_me: false,
    become_author_pending_approval: false,
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
  });
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Users", dummyUsers, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
