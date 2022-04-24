const db = require("../../models");
const randomstring = require("randomstring");
const { successResponse, errorResponse } = require("../../helpers/index");
const { User, Car, Reservation, Schedule, Route } = db;
import Sequelize, { Op } from 'sequelize';

const getAllReservations = async (req, res) => {
  try {
    console.log(req.query.page);
    const page = req.query.page || 1;
    const limit = 8;
    const reservations = await Reservation.findAndCountAll({
      order: [
        ["createdAt", "DESC"],
        ["fullname", "ASC"],
      ],
      offset: (page - 1) * limit,
      limit,
    });
    return successResponse(req, res, { reservations });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

const getReservationOfUser = async (req, res) => {
  try {
    const reservationId = req.params.reservationId;
    const reservation = await Reservation.findAll({
      where: { userId: reservationId },
      include: [
        {
          model: Car,
          as: "cars",
        },
      ],
    });
    return successResponse(req, res, { reservation });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
const getReservation = async (req, res) => {
  try {
    const carId = req.params.carId;
    console.log(carId);
    const d = req.query.date;
    const reservation = await Reservation.findAll({
      attributes: ['position'],
      // include: [
      //   {
      //     model: Car,
      //     as: "cars",
      //   },
      // ],
      where: {  carId: carId,
        reservation_date : { [Op.substring]: `${d}` }
       },
    });
    return successResponse(req, res, { reservation });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

const getReservationOfCar = async (req, res) => {
  try {
    const carId = req.params.carId;
    const reservation = await Reservation.findAll({
      where: { carId: carId },
      include: [
        {
          model: Car,
          as: "cars",
        },
      ],
    });
    return successResponse(req, res, { reservation });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

const createReservation = async (req, res) => {
  try {
    const { userId } = req.user;
    const carId = req.params.carId;
    console.log(req.body);

    const car = await Car.findOne({ where: { id: carId } });
    if (!car) {
      return res.send({ message: "Car not found!" });
    }

    const reservation = await Reservation.create({
      receipt_number: randomstring.generate(10),
      amount: req.body.amount,
      paid_amount: req.body.paid_amount || 0,
      paid_date: new Date(),
      reservation_date: new Date(),
      carId: carId,
      userId: userId,
      quantity: req.body.quantity,
      fullname: req.body.fullname,
      phone: req.body.phone,
      email: req.body.email,
    });

    return successResponse(req, res, "Success");
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

module.exports = {
  getAllReservations,
  getReservation,
  getReservationOfCar,
  getReservationOfUser,
  createReservation,
};
