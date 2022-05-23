'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Schedules", "lineId", {
        type: Sequelize.INTEGER,
        references: {
          model: 'Lines',
          key: 'id',
          as: 'lineId'
        }
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("Schedules", "lineId"),
    ]);
  },
};