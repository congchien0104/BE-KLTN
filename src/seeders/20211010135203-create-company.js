"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Companies", [
      {
        name: "Cong Chien",
        address: "Dak Lak",
        phone: 357287247,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Hoang Minh",
        address: "TP HCM",
        phone: 357287248,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Mai Duyen",
        address: "Nha Trang",
        phone: 357287249,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Hong Tham",
        address: "Da Nang",
        phone: 35728725,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Cars", null, {});
  },
};
