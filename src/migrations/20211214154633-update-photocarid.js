'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Photos", "carId", {
        type: Sequelize.INTEGER,
        references: {
          model: "Cars",
          key: "id",
          as: "cars",
        },
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("Photos", "carId"),
    ]);
  },
};