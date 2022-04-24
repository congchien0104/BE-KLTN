"use strict";
module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define(
    "Ticket",
    {
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      discount: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
    },
    {}
  );
  Ticket.associate = function (models) {
    // associations can be defined here
    Ticket.hasOne(models.Seat, {
      foreignKey: "ticketId",
      as: "ticket",
    });
  };
  return Ticket;
};
