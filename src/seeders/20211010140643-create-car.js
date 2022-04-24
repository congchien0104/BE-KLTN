"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Cars", [
      {
        name: "Nha Xe Cong Chien",
        plate_number: "47B",
        capacity: 36,
        station: "Ben xe Eahleo",
        createdAt: new Date(),
        updatedAt: new Date(),
        companyId: 1,
      },
      {
        name: "Nha Xe Cong Chien",
        plate_number: "47B",
        capacity: 36,
        station: "Ben xe CuMot",
        createdAt: new Date(),
        updatedAt: new Date(),
        companyId: 1,
      },
      {
        name: "Nha Xe Hoang Minh",
        plate_number: "59B",
        capacity: 36,
        station: "Ben xe Mien Dong",
        createdAt: new Date(),
        updatedAt: new Date(),
        companyId: 2,
      },
      {
        name: "Nha Xe Mai Duyen",
        plate_number: "79B",
        capacity: 36,
        station: "Ben xe Nha Trang",
        createdAt: new Date(),
        updatedAt: new Date(),
        companyId: 3,
      },
      {
        name: "Nha Xe Hong Tham",
        plate_number: "47B",
        capacity: 36,
        station: "Ben xe Buon Me Thuot",
        createdAt: new Date(),
        updatedAt: new Date(),
        companyId: 4,
      },
      {
        name: "Nha Xe HongTham",
        plate_number: "47B",
        capacity: 36,
        station: "Ben xe Eadrang",
        createdAt: new Date(),
        updatedAt: new Date(),
        companyId: 4,
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Cars", null, {});
  },
};
