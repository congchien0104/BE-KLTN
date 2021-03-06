"use strict";
module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define(
    "Schedule",
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
  Schedule.associate = function (models) {
    // associations can be defined here
    Schedule.belongsTo(models.Line, {
      foreignKey: {
        name: 'lineId',
        allowNull: false
      },
      as: 'schedules'
    });
  };
  return Schedule;
};
