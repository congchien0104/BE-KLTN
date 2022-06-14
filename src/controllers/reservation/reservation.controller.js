const db = require("../../models");
const randomstring = require("randomstring");
const { successResponse, errorResponse } = require("../../helpers/index");
const { User, Car, Reservation, Schedule, Line } = db;
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
          include: [
            {
              model: Line,
              as: "lines",
            },
          ],
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
          include: [
            {
              model: Line,
              as: "lines",
            },
          ],
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
    const { page, search } = req.query;
    const pages = page || 1;
    const limit = 8;
    const carId = req.params.carId;
    const reservation = await Reservation.findAndCountAll({
      where: { 
            carId: carId,
            [Op.or]: {
              receipt_number: {
                [Op.like]: '%' + search + '%'
              },
              fullname: {
                [Op.like]: '%' + search + '%'
              },
              email: {
                [Op.like]: '%' + search + '%'
              },
              pickup_place: {
                [Op.like]: '%' + search + '%'
              },
              dropoff_place: {
                [Op.like]: '%' + search + '%'
              },
            }
        },
      include: [
        {
          model: Car,
          as: "cars",
          // where: {
          //   [Op.or]: {
          //     name: {
          //       [Op.like]: '%' + search + '%'
          //     },
          //     plate_number: {
          //       [Op.like]: '%' + search + '%'
          //     },
          //   }
          // },
          include: [
            {
              model: Line,
              as: "lines",
              // where: {
              //   [Op.or]: {
              //     start: {
              //       [Op.like]: '%' + search + '%'
              //     },
              //     destination: {
              //       [Op.like]: '%' + search + '%'
              //     },
              //   }
              // }
            },
          ],
        },
      ],
      order: [
        ['createdAt', 'DESC']
      ],
      offset: search ? 0 : (pages - 1) * limit,
      limit,
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

    // const car = await Car.findOne({ where: { id: carId } });
    // if (!car) {
    //   return res.send({ message: "Car not found!" });
    // }

    // const reservation = await Reservation.create({
    //   receipt_number: randomstring.generate(10),
    //   amount: data.amount,
    //   paid_amount: data.amount,
    //   paid_date: new Date(),
    //   reservation_date: new Date(data.reservations_date),
    //   carId: data.carId,
    //   userId: userId || 14,
    //   quantity: data.quantity,
    //   fullname: data.fullname,
    //   phone: data.phone,
    //   email: data.email,
    //   cccd: data.cccd,
    //   pickup_place: data.pickup_place,
    //   dropoff_place: data.dropoff_place,
    //   position: temp.join(","),
    //   status: ticketStatus.active,
    // });

    // return successResponse(req, res, reservation);
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
