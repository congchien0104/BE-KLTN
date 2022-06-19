const db = require("../../models");
const { successResponse, errorResponse } = require("../../helpers/index");
const { Company, Car, Route, Schedule, Seat, Reservation, Line } = db;
const randomstring = require("randomstring");

export const getLinesList = async (req, res) => {
  try {
    const companyId = req.params.id;
    console.log(companyId);
    const list = await Car.findAll({
      where: { companyId: companyId },
      include: [
        {
          model: Line,
          as: "lines",
        },
      ]
    })
    return successResponse(req, res, { list });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

// const getAllRoutes = async (req, res) => {
//   try {
//     const schedules = await Schedule.findAll({
//       include: [
//         {
//           model: Car,
//           as: "schedules",
//         },
//       ],
//     });
//     return successResponse(req, res, { schedules });
//   } catch (error) {
//     return errorResponse(req, res, error.message);
//   }
// };

const getSheduleOfCar = async (req, res) => {
  try {
    const carId = req.params.carId;
    const car = await Car.findOne({
      where: { id: carId },
      include: [
        {
          model: Schedule,
          as: "schedules",
          include: [
            {
              model: Route,
              as: "carroutes",
            },
          ],
        },
      ],
    });
    return successResponse(req, res, { car });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

const getSheduleOfRoute = async (req, res) => {
  try {
    const routeId = req.params.routeId;
    const route = await Route.findOne({
      where: { id: routeId },
      include: [
        {
          model: Schedule,
          as: "lines",
          include: [
            {
              model: Car,
              as: "schedules",
            },
          ],
        },
      ],
    });
    return successResponse(req, res, { route });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

const createSchedule = async (req, res) => {
  try {
    const { userId } = req.user;
    console.log(userId);
    const carId = req.params.carId;
    console.log(req.body);
    const dataToSave = req.body;

    const car = await Car.findOne({ where: { id: carId } });
    if (!car) {
      return res.send({ message: "Car not found!" });
    }

    const resDateToSave = (dataToSave || []).map((item) => {
      return {
        ...item,
        receipt_number: randomstring.generate(10),
        paid_date: new Date(),
        userId: userId,
        paid_amount: 0,
        companyId: car.companyId,
      }
    });

    console.log(resDateToSave);

    const reservation = await Reservation.bulkCreate(resDateToSave);

    return successResponse(req, res, reservation);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

module.exports = {
  getLinesList,
  getSheduleOfCar,
  getSheduleOfRoute,
  createSchedule,
};
