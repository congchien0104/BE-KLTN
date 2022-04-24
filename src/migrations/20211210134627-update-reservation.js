'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Reservations", "quantity", {
        allowNull: false,
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn("Reservations", "fullname", {
        allowNull: false,
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("Reservations", "phone", {
        allowNull: false,
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("Reservations", "email", {
        allowNull: false,
        type: Sequelize.STRING,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("Reservations", "quantity"),
      queryInterface.removeColumn("Reservations", "fullname"),
      queryInterface.removeColumn("Reservations", "phone"),
      queryInterface.removeColumn("Reservations", "email"),
    ]);
  },
};