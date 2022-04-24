'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Cars", "price", {
        allowNull: false,
        type: Sequelize.FLOAT,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("Cars", "price"),
    ]);
  },
};
