const db = require("../../models");
const randomstring = require("randomstring");
const { successResponse, errorResponse } = require("../../helpers/index");
const { User, Car, Reservation, Company, Line, Journey } = db;
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
        {
          model: Company,
          as: 'company'
        }
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
        {
          model: Company,
          as: 'company'
        }
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

const getReservationListOfCompany = async (req, res) => {
  try {
    const { userId } = req.user;
    const { page } = req.query;
    const pages = page || 1;
    const limit = 8;

    const user = await User.findOne({
      where: { id: userId},
      include: [
        {
          model: Company,
          as: "company",
        }
      ]
    });

    if (!user.company) {
      return res.send({ message: "Company not found!" });
    }

    console.log("test", user.company.id);

    
    //const companyId = req.params.companyId;
    const reservationList = await Reservation.findAndCountAll({
      where: { 
            companyId: user?.company?.id,
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
            ]
          }
        ],
      order: [
        ['createdAt', 'DESC']
      ],
      offset: (pages - 1) * limit,
      limit,
    });
    console.log("test", reservationList);

    return successResponse(req, res, { reservationList });
  } catch(error) {
    return errorResponse(req, res, error.message);
  }
}

const getReservationOfCompany = async (req, res) => {
  try {
    const { userId } = req.user;
    const { page, search } = req.query;
    console.log(search);
    const pages = page || 1;
    const limit = 8;
    

    const user = await User.findOne({
      where: { id: userId},
      include: [
        {
          model: Company,
          as: "company",
        }
      ]
    });

    if (!user.company) {
      return res.send({ message: "Company not found!" });
    }

    console.log("test", user.company.id);
    const condition = search ? { 
      companyId: user?.company?.id,
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
        '$cars.name$' : {
          [Op.like]: '%' + search + '%'
        },
      }
  } : { companyId: user?.company?.id };

    
    //const companyId = req.params.companyId;
    const reservationList = await Reservation.findAndCountAll({
      where: condition,
        include: [
                {
                  model: Car,
                  as: "cars",
                  required: true,
                  include: [
                    {
                      model: Line,
                      as: "lines",
                    },
                  ]
                }
        ],
      order: [
        ['createdAt', 'DESC']
      ],
      offset: search ? 0 : (pages - 1) * limit,
      limit,
    });
    console.log("test", reservationList);

    return successResponse(req, res, { reservationList });
  } catch(error) {
    return errorResponse(req, res, error.message);
  }
}


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
  getReservationListOfCompany,
  getReservationOfCompany,
  getReservationOfUser,
  updateReservationStatus,
  getTotalAmount,
};
