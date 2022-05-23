"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Journeys", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      time_hour: {
        allowNull: false,
        type: Sequelize.TIME,
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      lineId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Lines',
          key: 'id',
          as: 'lineId'
        }
      },
      status: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Journeys");
  },
};
