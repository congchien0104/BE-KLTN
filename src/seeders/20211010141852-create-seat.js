"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Seats", [
      {
        name: "A1",
        status: false,
        carId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        ticketId: 1,
      },
      {
        name: "A2",
        status: true,
        carId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        ticketId: 2,
      },
      {
        name: "A3",
        status: false,
        carId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        ticketId: 3,
      },
      {
        name: "A4",
        status: false,
        carId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        ticketId: 4,
      },
      {
        name: "B1",
        status: false,
        carId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        ticketId: 5,
      },
      {
        name: "B2",
        status: true,
        carId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        ticketId: 6,
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Seats", null, {});
  },
};
