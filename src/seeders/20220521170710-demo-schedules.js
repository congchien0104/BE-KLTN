"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Journeys", [
      {
        time_hour: "16:00:00",
        address: "Cư Mốt",
        status: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        lineId: 11,
      },
      {
        time_hour: "16:10:00",
        address: "EaRal",
        status: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        lineId: 11,
      },
      {
        time_hour: "16:30:00",
        address: "Eadrang",
        status: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        lineId: 11,
      },
      {
        time_hour: "17:00:00",
        address: "Km72",
        status: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        lineId: 11,
      },
      {
        time_hour: "04:00:00",
        address: "Thuận An",
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        lineId: 11,
      },
      {
        time_hour: "04:20:00",
        address: "Bến xe miền đông",
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        lineId: 11,
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Journeys", null, {});
  },
};
