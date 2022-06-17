'use strict';
module.exports = (sequelize, DataTypes) => {
  const Line = sequelize.define('Line', {
    start: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    departure_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    arrival_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    innitiated_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    weekdays: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    station: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    station_to: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  Line.associate = function(models) {
    Line.belongsTo(models.Car, {
      foreignKey: {
        name: 'carId',
        allowNull: false
      },
      as: 'lines'
    });
    Line.hasMany(models.Journey, {
      foreignKey: {
        name: 'lineId',
        allowNull: false
      },
      as: 'journeys'
    });
    Line.belongsTo(models.Company, {
      foreignKey: {
        name: 'companyId',
        allowNull: false
      },
      as: 'trips'
    });
  };
  return Line;
};