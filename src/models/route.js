"use strict";
module.exports = (sequelize, DataTypes) => {
  const Route = sequelize.define(
    "Route",
    {
      starting_point: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      destination: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      departture_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      arrival_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
    },
    {}
  );
  Route.associate = function (models) {
    // associations can be defined here
    // Route.belongsToMany(models.Car, {
    //   through: "Schedule",
    //   foreignKey: "routeId",
    //   as: "cars",
    // });
  };
  return Route;
};
