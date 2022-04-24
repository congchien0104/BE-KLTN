"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Schedules", [
      {
        carId: 1,
        routeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        carId: 1,
        routeId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        carId: 2,
        routeId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        carId: 2,
        routeId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        carId: 3,
        routeId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        carId: 4,
        routeId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Schedules", null, {});
  },
};
