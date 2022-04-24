'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("CarSeats", [
      {
        name: "A1",
        status: false,
        carId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "A2",
        status: true,
        carId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "A3",
        status: false,
        carId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "A4",
        status: true,
        carId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "A5",
        status: false,
        carId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "A6",
        status: false,
        carId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "A7",
        status: false,
        carId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "A8",
        status: false,
        carId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "B1",
        status: false,
        carId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "B2",
        status: true,
        carId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "B3",
        status: false,
        carId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "B4",
        status: true,
        carId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "B5",
        status: false,
        carId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "B6",
        status: false,
        carId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "B7",
        status: false,
        carId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "B8",
        status: false,
        carId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "C1",
        status: false,
        carId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "C2",
        status: true,
        carId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "C3",
        status: false,
        carId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "C4",
        status: true,
        carId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "C5",
        status: false,
        carId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "C6",
        status: false,
        carId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "C7",
        status: false,
        carId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "C8",
        status: false,
        carId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "D1",
        status: false,
        carId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "D2",
        status: true,
        carId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "D3",
        status: false,
        carId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "D4",
        status: true,
        carId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "D5",
        status: false,
        carId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "D6",
        status: false,
        carId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "D7",
        status: false,
        carId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "D8",
        status: false,
        carId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "E1",
        status: false,
        carId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "E2",
        status: false,
        carId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "E3",
        status: false,
        carId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "E4",
        status: false,
        carId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "E5",
        status: false,
        carId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "E6",
        status: false,
        carId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "E7",
        status: false,
        carId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "E8",
        status: false,
        carId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("CarSeats", null, {});
  }
};
