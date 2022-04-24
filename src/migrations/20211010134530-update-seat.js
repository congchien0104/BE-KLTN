"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
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
