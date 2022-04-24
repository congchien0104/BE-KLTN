"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Tickets", [
      {
        price: 200000,
        discount: 20000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        price: 200000,
        discount: 20000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        price: 200000,
        discount: 20000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        price: 200000,
        discount: 20000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        price: 200000,
        discount: 20000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        price: 200000,
        discount: 20000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Tickets", null, {});
  },
};
