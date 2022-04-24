"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Routes", [
      {
        starting_point: "Dak Lak",
        destination: "Sai Gon",
        departture_time: "16:30:00",
        arrival_time: "5:30:00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        starting_point: "Dak Lak",
        destination: "Ha Noi",
        departture_time: "16:30:00",
        arrival_time: "5:30:00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        starting_point: "Dak Lak",
        destination: "Nha Trang",
        departture_time: "16:30:00",
        arrival_time: "5:30:00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        starting_point: "Sai Gon",
        destination: "Dak Lak",
        departture_time: "16:30:00",
        arrival_time: "5:30:00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        starting_point: "Vung Tau",
        destination: "Sai Gon",
        departture_time: "16:30:00",
        arrival_time: "5:30:00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        starting_point: "Da Nang",
        destination: "Sai Gon",
        departture_time: "16:30:00",
        arrival_time: "5:30:00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Routes", null, {});
  },
};
