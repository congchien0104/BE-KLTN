"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        "Users", // table name
        "verified", // new field name
        {
          type: Sequelize.ENUM("Pending", "Active"),
          defaultValue: "Pending",
        }
      ),
      queryInterface.addColumn("Users", "confirmationcode", {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("Users", "verified"),
      queryInterface.removeColumn("Users", "confirmationcode"),
    ]);
  },
};
