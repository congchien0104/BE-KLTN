'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Lines", "price", {
        type: Sequelize.FLOAT,
        allowNull: false,
      }),
      queryInterface.addColumn("Lines", "station", {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.addColumn("Lines", "station_to", {
        type: Sequelize.STRING,
        allowNull: false,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("Lines", "price"),
      queryInterface.removeColumn("Lines", "station"),
      queryInterface.removeColumn("Lines", "station_to"),
    ]);
  }
};
