"use strict";
module.exports = (sequelize, DataTypes) => {
  const Seat = sequelize.define(
    "Seat",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {}
  );
  Seat.associate = function (models) {
    // associations can be defined here
    Seat.belongsTo(models.Car, {
      foreignKey: {
        name: "carId",
        allowNull: false,
      },
      as: "seats",
    });

    // Seat.belongsTo(models.Ticket, {
    //   foreignKey: "tiketId",
    //   as: "ticket",
    // });
  };

  return Seat;
};
