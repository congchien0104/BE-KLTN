"use strict";
module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define(
    "Schedule",
    {
      carId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      routeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {}
  );
  Schedule.associate = function (models) {
    // associations can be defined here
    Schedule.belongsTo(models.Car, {
      foreignKey: {
        name: "carId",
        allowNull: false,
      },
      as: "schedules",
    });
    Schedule.belongsTo(models.Route, {
      foreignKey: {
        name: "routeId",
        allowNull: false,
      },
      as: "carroutes",
    });
  };
  return Schedule;
};
