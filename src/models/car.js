"use strict";
module.exports = (sequelize, DataTypes) => {
  const Car = sequelize.define(
    "Car",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      plate_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      station: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      station_to: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status_trip: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );
  Car.associate = function (models) {
    // associations can be defined here
    Car.hasMany(models.Seat, {
      foreignKey: {
        name: "carId",
        allowNull: false,
      },
      as: "seats",
    });

    Car.belongsTo(models.Company, {
      foreignKey: {
        name: "companyId",
        allowNull: false,
      },
      as: "cars",
    });

    Car.belongsToMany(models.Route, {
      through: "Schedule",
      foreignKey: "carId",
      as: "routes",
    });
    Car.hasMany(models.Feedback, {
      foreignKey: {
        name: "carId",
        allowNull: false,
      },
      as: "feedbacks",
    });
    Car.hasMany(models.Reservation, {
      foreignKey: {
        name: "carId",
        allowNull: false,
      },
      as: "reservations",
    });
    Car.hasMany(models.Photo, {
      foreignKey: {
        name: 'carId',
        allowNull: false
      },
      as: 'photos'
    });
    Car.hasMany(models.CarSeat, {
      foreignKey: {
        name: 'carId',
        allowNull: false
      },
      as: 'carseats'
    });
    Car.hasMany(models.Line, {
      foreignKey: {
        name: 'carId',
        allowNull: false
      },
      as: 'lines'
    });
  };
  return Car;
};
