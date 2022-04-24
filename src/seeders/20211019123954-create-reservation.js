"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Reservations", [
      {
        receipt_number: "123456",
        amount: 100000,
        paid_amount: 100000,
        paid_date: new Date(),
        reservation_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
        carId: 1,
      },
      {
        receipt_number: "123456",
        amount: 100000,
        paid_amount: 100000,
        paid_date: new Date(),
        reservation_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 10,
        carId: 4,
      },
      {
        receipt_number: "1234567",
        amount: 100000,
        paid_amount: 100000,
        paid_date: new Date(),
        reservation_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 9,
        carId: 1,
      },
      {
        receipt_number: "1234568",
        amount: 100000,
        paid_amount: 100000,
        paid_date: new Date(),
        reservation_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 11,
        carId: 3,
      },
      {
        receipt_number: "1234569",
        amount: 100000,
        paid_amount: 100000,
        paid_date: new Date(),
        reservation_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 10,
        carId: 4,
      },
      {
        receipt_number: "1234561",
        amount: 100000,
        paid_amount: 100000,
        paid_date: new Date(),
        reservation_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
        carId: 3,
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Reservations", null, {});
  },
};
