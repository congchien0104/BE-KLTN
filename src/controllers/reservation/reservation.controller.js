const db = require("../../models");
const randomstring = require("randomstring");
const { successResponse, errorResponse } = require("../../helpers/index");
const { User, Car, Reservation, Schedule, Route } = db;
import Sequelize, { Op } from 'sequelize';
import { ticketStatus } from '../../constants/status';



const updateReservationStatus = async (req, res) => {
  try {
    const id = req.params.reservationId;
    console.log(id);
    const reservation = Reservation.findOne({
      where: { id: id}
    })
    if (!reservation) {
      return res.status(400).send({ message: "Reservation not found!" });
    }
    const result = await Reservation.update(
      { status: ticketStatus.cancelled},
      { where: { id: id } }
    );

    return successResponse(req, res, { result });
  } catch(error) {
    return errorResponse(req, res, error.message);
  }
}


const getAllReservations = async (req, res) => {
  try {
    const id = req.params.reservationId;
    console.log(id);
    const reservation = Reservation.findOne({
      where: { id: id}
    })
    if (!reservation) {
      return res.status(400).send({ message: "Reservation not found!" });
    }
    const result = await Reservation.update(
      { status: ticketStatus.cancelled},
      { where: { id: id } }
    );

    return successResponse(req, res, { result });
  } catch(error) {
    return errorResponse(req, res, error.message);
  }
};

const getReservationOfUser = async (req, res) => {
  try {
    const reservationId = req.params.reservationId;
    const reservation = await Reservation.findAll({
      where: { userId: reservationId,
        createdAt: {
          [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000)
        },
        status: ticketStatus.active,
      },
      include: [
        {
          model: Car,
          as: "cars",
        },
      ],
      order: [
        ["createdAt", 'DESC']
      ]
    });

    const result = await Reservation.findAll({
      where: { userId: reservationId,
        createdAt: {
          [Op.lt]: new Date(),
        },
        status: !ticketStatus.active,
      },
      include: [
        {
          model: Car,
          as: "cars",
        },
      ],
      order: [
        ["createdAt", 'DESC']
      ]
    });
    return successResponse(req, res, { reservation: reservation || [], result: result || []  });
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
      status: ticketStatus.active,
    });

    return successResponse(req, res, "Success");
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

// calculate total amount
const getTotalAmount = async (req, res) => {
  try {
    const total = await Reservation.sum('amount');
    return successResponse(req, res, { total });
  } catch(error) {
    return errorResponse(req, res, error.message);
  }
}

const calculateTotalOfCompany = async (req, res) => {
  try {

  } catch(error) {
    return errorResponse(req, res, error.message);
  }
}


module.exports = {
  getAllReservations,
  getReservation,
  getReservationOfCar,
  getReservationOfUser,
  createReservation,
  updateReservationStatus,
  getTotalAmount,
};
