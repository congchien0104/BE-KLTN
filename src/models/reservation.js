"use strict";
const randomstring = require("randomstring");
import { ticketStatus } from '../constants/status';

module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define(
    "Reservation",
    {
      receipt_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      paid_amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      paid_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      reservation_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cccd: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pickup_place: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dropoff_place: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      position: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      companyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {}
  );
  Reservation.associate = function (models) {
    // associations can be defined here
    Reservation.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      as: "users",
    });
    Reservation.belongsTo(models.Car, {
      foreignKey: {
        name: "carId",
        allowNull: false,
      },
      as: "cars",
    });
    Reservation.belongsTo(models.Company, {
      foreignKey: {
        name: "carId",
        allowNull: false,
      },
      as: "company",
    });
  };
  Reservation.createReservation = async function (data) {
    console.log(data);
    const temp = data.arr;
    let reservation = await this.create({
      receipt_number: randomstring.generate(10),
      amount: data.amount,
      paid_amount: data.amount,
      paid_date: new Date(),
      reservation_date: new Date(data.reservations_date),
      carId: data.carId,
      userId: 14,
      quantity: data.quantity,
      fullname: data.fullname,
      phone: data.phone,
      email: data.email,
      cccd: data.cccd,
      pickup_place: data.pickup_place,
      dropoff_place: data.dropoff_place,
      position: temp.join(","),
      status: ticketStatus.active,
    });

    return reservation;
  };
  return Reservation;
};
