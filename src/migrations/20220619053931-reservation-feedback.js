'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Reservations", "companyId", {
        type: Sequelize.INTEGER,
        allowNull: false,
      }),
      queryInterface.addColumn("Feedbacks", "companyId", {
        type: Sequelize.INTEGER,
        allowNull: false,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
