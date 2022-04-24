'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      // queryInterface.addColumn("Reservations", "cccd", {
      //   type: Sequelize.STRING,
      // }),
      // queryInterface.addColumn("Lines", "status_trip", {
      //   type: Sequelize.BOOLEAN,
      //   defaultValue: false,
      // }),
      // queryInterface.addColumn("Lines", "start_route_trip", {
      //   type: Sequelize.TIME,
      // }),
      // queryInterface.addColumn("Lines", "des_route_trip", {
      //   type: Sequelize.TIME,
      // }),
      queryInterface.addColumn("Cars", "station_to", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("Cars", "status_trip", {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      // queryInterface.removeColumn("Reservations", "cccd"),
      // queryInterface.removeColumn("Lines", "status_trip"),
      // queryInterface.removeColumn("Lines", "start_route_trip"),
      // queryInterface.removeColumn("Lines", "des_route_trip"),
      queryInterface.removeColumn("Cars", "station_to"),
      queryInterface.removeColumn("Cars", "status_trip"),
    ]);
  },
};