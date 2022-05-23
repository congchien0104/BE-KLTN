"use strict";
module.exports = (sequelize, DataTypes) => {
  const Journey = sequelize.define(
    "Journey",
    {
      time_hour: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      address: {
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
  Journey.associate = function (models) {
    // associations can be defined here
    Journey.belongsTo(models.Line, {
      foreignKey: {
        name: 'lineId',
        allowNull: false
      },
      as: 'journeys'
    });
  };
  return Journey;
};
