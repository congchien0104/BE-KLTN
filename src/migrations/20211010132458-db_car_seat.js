"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        "Seats", // table name
        "Id", // new field name
        {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        }
      ),
      queryInterface.addColumn("Seats", "name", {
        allowNull: false,
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("Seats", "status", {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }),
      queryInterface.addColumn("Seats", "carId", {
        type: Sequelize.INTEGER,
        references: {
          model: "Cars",
          key: "id",
          as: "carId",
        },
      }),
      queryInterface.addColumn("Seats", "ticketId", {
        type: Sequelize.INTEGER,
        references: {
          model: "Tickets",
          key: "id",
          as: "ticketId",
        },
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    // return Promise.all([
    //   queryInterface.removeColumn("Seats", "name"),
    //   queryInterface.removeColumn("Seats", "confirmationcode"),
    // ]);
  },
};
